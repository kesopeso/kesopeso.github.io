import React, { useState } from 'react';
import './App.css';
import Simulator from './Simulator';
import Logos from './Logos';
import Container from './Container';
import Menu from './Menu';
import Content from './Content';
import { ContainerBackground } from './Container';

export enum Pages {
    SIMULATOR,
    LOGOS,
}

function App() {
    const [page, setPage] = useState<Pages>(Pages.SIMULATOR);

    const pageElement = page === Pages.SIMULATOR ? <Simulator /> : <Logos />;
    const backgroundClass = page === Pages.SIMULATOR ? ContainerBackground.PRIMARY : ContainerBackground.SECONDARY;

    return (
        <Container backgroundClass={backgroundClass}>
            <Menu onChange={setPage} activePage={page} />
            <Content>{pageElement}</Content>
        </Container>
    );
}

export default App;
