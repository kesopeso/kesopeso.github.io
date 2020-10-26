import React, { useState } from 'react';
import './App.css';
import Simulator from './Simulator';
import Logos from './Logos';
import Calculator from './Calculator';
import Container from './Container';
import Menu from './Menu';
import Content from './Content';
import { ContainerBackground } from './Container';

export enum Pages {
    SIMULATOR,
    LOGOS,
    CALCULATOR,
}

function App() {
    const [page, setPage] = useState<Pages>(Pages.CALCULATOR);

    let pageElement: JSX.Element;
    let backgroundClass: ContainerBackground;

    switch (page) {
        case Pages.SIMULATOR:
            pageElement = <Simulator />;
            backgroundClass = ContainerBackground.PRIMARY;
            break;

        case Pages.LOGOS:
            pageElement = <Logos />;
            backgroundClass = ContainerBackground.SECONDARY;
            break;

        default:
            pageElement = <Calculator />;
            backgroundClass = ContainerBackground.TERTIARY;
    }

    return (
        <Container backgroundClass={backgroundClass}>
            <Menu onChange={setPage} activePage={page} />
            <Content>{pageElement}</Content>
        </Container>
    );
}

export default App;
