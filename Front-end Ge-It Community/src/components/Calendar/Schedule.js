import React, { useState, useEffect } from "react";
import axios from 'axios';
import Modal from 'react-modal';
import {
  format,
  parseISO,
  setHours,
  setMinutes,
  addDays,
} from "date-fns";
import '../../assets/css/Schedule.css'
import { fr } from "date-fns/locale";

Modal.setAppElement("#root")

const MySchedule = ({ startDate }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    start_hour: "",
    end_hour: "",
    location: "",
  });

  const [newEvent, setNewEvent] = useState(null);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8800/events/getEventsByWeek/${startDate}`
      );
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  }

  const fetchCourses = async () => {
    try {
      const courseData = await axios.get("http://localhost:8800/cours");
      setCourses(courseData.data.cours);
    } catch (error) {
      console.error("Error fetching Courses : ", error);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    fetchEvents();
    fetchCourses();
  }, [startDate]);

  const organizeEventsByDay = (events) => {
    const start = parseISO(startDate);
    return events.map((event) => {
      const eventDate = parseISO(event.date);
      const startHour = event.start_hour ? event.start_hour.split(":") : [0, 0];
      const endHour = event.end_hour ? event.end_hour.split(":") : [0, 0];

      return {
        ...event,
        dayIndex: Math.floor((eventDate - start) / (1000 * 60 * 60 * 24)),
        startTime: setHours(
          setMinutes(eventDate, parseInt(startHour[1])),
          parseInt(startHour[0])
        ),
        endTime: setHours(
          setMinutes(eventDate, parseInt(endHour[1])),
          parseInt(endHour[0])
        ),
      };
    });
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      start_hour: event.start_hour,
      end_hour: event.end_hour,
      location: event.location,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8800/events/${selectedEvent.id}`,
        formData
      );
      setSelectedEvent(null);
      await fetchEvents(); // Recharger les événements après modification
    } catch (error) {
      console.error("Error updating event:", error);
    }
    console.log(selectedEvent.id);
    console.log(formData);
  };

  const handleDeleteEvent = async () => {
    try {
      await axios.delete(
        `http://localhost:8800/events/${selectedEvent.id}`
      );
      setSelectedEvent(null);
      await fetchEvents(); // Recharger les événements après suppression
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleNewEventSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8800/events`, formData);
      setNewEvent(null);
      await fetchEvents(); // Recharger les événements après ajout
    } catch (error) {
      console.error("Error creating event:", error);
    }
    console.log(formData);
  };

  const eventsByDay = organizeEventsByDay(events);

  // Fonction pour trier les événements par heure de début
  const sortEventsByStartTime = (events) => {
    return events.sort((a, b) => a.startTime - b.startTime);
  };

  const timeSlots = [
    { start: 8, end: 12, label: "Matin" },
    { start: 13, end: 17, label: "Après-midi" },
  ];

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const handleCellClick = (dayIndex, slot) => {
    const selectedDate = new Date(startDate);
    selectedDate.setDate(selectedDate.getDate() + dayIndex);
    setFormData({
      title: "",
      description: "",
      date: format(selectedDate, "yyyy-MM-dd"),
      start_hour: `${slot.start}:00`,
      end_hour: `${slot.end}:00`,
      location: "",
    });
    setNewEvent({ dayIndex, slot });
  };

  const weekDates = daysOfWeek.map((_, index) => {
    const date = addDays(parseISO(startDate), index);
    return format(date, "EEEE d MMMM yyyy");
  });

  return (
    <div className="weekly-schedule">
      <table>
        <thead>
          <tr>
            <th>Time</th>
            {weekDates.map((date, index) => (
              <th key={index}>{format(date, "PPPP", { locale: fr })}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((slot, index) => (
            <tr key={index}>
              <td>{slot.label}</td>
              {daysOfWeek.map((_, dayIndex) => {
                const eventsInThisSlot = eventsByDay.filter(
                  (event) =>
                    event.dayIndex === dayIndex &&
                    event.startTime.getHours() < slot.end &&
                    event.endTime.getHours() >= slot.start
                );

                // Trier les événements par heure de début
                const sortedEvents = sortEventsByStartTime(eventsInThisSlot);

                return (
                  <td
                    key={dayIndex}
                    onClick={() => handleCellClick(dayIndex, slot)}
                  >
                    {sortedEvents.map((event) => (
                      <div
                        key={event.id}
                        className="event"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEventClick(event);
                        }}
                        onMouseOver={(e) => {
                          e.target.title = `
                            ${event.description} - ${event.location}`;
                        }}
                      >
                        <h4>{event.title}</h4>
                        <h5>{event.start_hour.slice(0, 5)} - {event.end_hour.slice(0, 5)}</h5>
                      </div>
                    ))}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {selectedEvent && (
          <Modal
            isOpen={!!selectedEvent} // Contrôle la visibilité du modal basé sur l'état
            onRequestClose={() => setSelectedEvent(null)} // Ferme le modal
            contentLabel="Edit Event" // Étiquette pour l'accessibilité
            className={`modal ${selectedEvent ? 'is-open' : ''}`} // Ajoute 'is-open' si selectedEvent est défini
            overlayClassName={`overlay ${selectedEvent ? 'is-open' : ''}`} // Même logique pour l'overlay
          >
            <h3>Edit Event</h3>
            <form onSubmit={handleFormSubmit} className="modal-form">
              {error && <p className="modal-error">{error}</p>}

              <div className="form-group">
                <label htmlFor="title">Course Title</label>
                <select
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select Course Title</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.titre_cours}>
                      {course.titre_cours}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter a brief description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="start_hour">Start Time</label>
                <input
                  type="time"
                  id="start_hour"
                  name="start_hour"
                  value={formData.start_hour}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="end_hour">End Time</label>
                <input
                  type="time"
                  id="end_hour"
                  name="end_hour"
                  value={formData.end_hour}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="Enter the event location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="modal-actions">
                <button type="submit" className="button button-primary">Save</button>
                <button type="button" className="button button-secondary" onClick={() => setSelectedEvent(null)}>
                  Cancel
                </button>
                <button type="button" className="button button-danger" onClick={handleDeleteEvent}>
                  Delete
                </button>
              </div>
            </form>

          </Modal>

        )}
      </div>
      {newEvent && (
        <Modal
          isOpen={!!newEvent}
          onRequestClose={() => setNewEvent(null)}
          contentLabel="Create Event"
          className={`modal ${newEvent ? 'is-open' : ''}`}
          overlayClassName={`overlay ${newEvent ? 'is-open' : ''}`}
        >
          <h3>Create Event</h3>
          <form onSubmit={handleNewEventSubmit} className="modal-form">
            {error && <p className="modal-error">{error}</p>}

            <div className="form-group">
              <label htmlFor="title">Course Title</label>
              <select
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select Course Title</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.titre_cours}>
                    {course.titre_cours}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter a brief description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="start_hour">Start Time</label>
              <input
                type="time"
                id="start_hour"
                name="start_hour"
                value={formData.start_hour}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="end_hour">End Time</label>
              <input
                type="time"
                id="end_hour"
                name="end_hour"
                value={formData.end_hour}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Enter the event location"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="modal-actions">
              <button type="submit" className="button button-primary">Save</button>
              <button type="button" className="button button-secondary" onClick={() => setNewEvent(null)}>
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default MySchedule;
