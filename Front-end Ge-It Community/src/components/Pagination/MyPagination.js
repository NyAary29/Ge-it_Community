import React, { useState } from 'react';
import { Pagination, PaginationItem, PaginationLink, CardFooter } from 'reactstrap';

const PaginationExample = ({ items }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Nombre d'éléments par page

    // Vérifiez si items est défini et a une longueur
    const totalPages = items && items.length ? Math.ceil(items.length / itemsPerPage) : 1;

    // Fonction pour gérer le changement de page
    const handleClick = (page) => {
        setCurrentPage(page);
    };
    
    // Générer les éléments de pagination
    const paginationItems = [];
    for (let i = 1; i <= totalPages; i++) {
        paginationItems.push(
            <PaginationItem key={i} className={currentPage === i ? 'active' : ''}>
                <PaginationLink href="#pablo" onClick={() => handleClick(i)}>
                    {i}
                    {currentPage === i && <span className="sr-only">(current)</span>}
                </PaginationLink>
            </PaginationItem>
        );
    }

    return (
        <CardFooter className="py-4">
            <nav aria-label="...">
                <Pagination className="pagination justify-content-end mb-0" listClassName="justify-content-end mb-0">
                    <PaginationItem disabled={currentPage === 1}>
                        <PaginationLink href="#pablo" onClick={() => handleClick(currentPage - 1)}>
                            <i className="fas fa-angle-left" />
                            <span className="sr-only">Previous</span>
                        </PaginationLink>
                    </PaginationItem>
                    {paginationItems}
                    <PaginationItem disabled={currentPage === totalPages}>
                        <PaginationLink href="#pablo" onClick={() => handleClick(currentPage + 1)}>
                            <i className="fas fa-angle-right" />
                            <span className="sr-only">Next</span>
                        </PaginationLink>
                    </PaginationItem>
                </Pagination>
            </nav>
        </CardFooter>
    );
};

export default PaginationExample;
