import React, { useState, useEffect } from "react";
import axios from "axios";
import { format, parseISO, startOfWeek, addDays } from "date-fns";
import { fr } from "date-fns/locale";
import MySchedule from "./Schedule";
import '../../assets/css/DisplaySchedule.css'; // Assuming this CSS file is for styling

const ScheduleManager = () => {
  const [startDate, setStartDate] = useState("");
  const [mondays, setMondays] = useState([]);
  const [viewMode, setViewMode] = useState("display"); // "display" or "create"

  // Function to fetch available Mondays from the API
  const fetchMondays = async () => {
    try {
      const response = await axios.get("http://localhost:8800/events/mondays");
      const mondaysList = response.data.map((dateStr) => parseISO(dateStr.date));
      mondaysList.sort((a, b) => a - b); // Sort the dates in ascending order
      setMondays(mondaysList);
    } catch (error) {
      console.error("Error fetching Mondays:", error);
    }
  };

  useEffect(() => {
    fetchMondays();
  }, []);

  // Function to generate all available Mondays for the next 3 months
  const generateAvailableMondays = () => {
    const today = new Date();
    const startOfNextWeek = startOfWeek(today); // Get the start of the next week

    // Generate all Mondays for the next 3 months
    const allMondays = [];
    let currentMonday = startOfNextWeek;
    for (let i = 0; i < 12; i++) { // 12 weeks = 3 months
      if (currentMonday.getDay() !== 1) {
        currentMonday = addDays(currentMonday, 1);
      }
      allMondays.push(currentMonday);
      currentMonday = addDays(currentMonday, 7); // Move to the next Monday
    }

    // Filter out the Mondays that are in the database
    const availableMondays = allMondays.filter(monday => {
      const formattedMonday = format(monday, 'yyyy-MM-dd');
      return !mondays.some(dbMonday => format(dbMonday, 'yyyy-MM-dd') === formattedMonday);
    });

    return availableMondays;
  };

  // Handle change in date selection
  const handleDateChange = (e) => {
    setStartDate(e.target.value);
  };

  return (
    <div className="schedule-manager-container">
      <div className="tab-container">
        <button
          className={`tab-button ${viewMode === "display" ? "active" : ""}`}
          onClick={() => setViewMode("display")}
        >
          Afficher les emplois du temps
        </button>
        <button
          className={`tab-button ${viewMode === "create" ? "active" : ""}`}
          onClick={() => setViewMode("create")}
        >
          Créer un nouvel emploi du temps
        </button>
      </div>

      {viewMode === "display" ? (
        <form onSubmit={(e) => e.preventDefault()} className="week-selection-form">
          <label htmlFor="monday-select" className="week-selection-label">
            Afficher l'emploi du temps hebdomadaire pour la semaine du :
            <select
              id="monday-select"
              value={startDate}
              onChange={handleDateChange}
              required
              className="week-selection-dropdown"
            >
              <option value="" disabled>
                Sélectionnez une date
              </option>
              {mondays.map((day) => (
                <option key={day.toISOString()} value={format(day, "yyyy-MM-dd")}>
                  {format(day, "PPPP", { locale: fr })}
                </option>
              ))}
            </select>
          </label>
        </form>
      ) : (
        <form onSubmit={(e) => e.preventDefault()} className="week-selection-form">
          <label htmlFor="monday-create" className="week-selection-label">
            Créer un nouvel emploi du temps hebdomadaire pour la semaine du :
            <select
              id="monday-create"
              value={startDate}
              onChange={handleDateChange}
              required
              className="week-selection-dropdown"
            >
              <option value="" disabled>
                Sélectionnez une date
              </option>
              {generateAvailableMondays().map((monday) => (
                <option key={monday} value={format(monday, "yyyy-MM-dd")}>
                  {format(monday, "PPPP", { locale: fr })}
                </option>
              ))}
            </select>
          </label>
        </form>
      )}

      {startDate && <MySchedule startDate={startDate} />}
    </div>
  );
};

export default ScheduleManager;
