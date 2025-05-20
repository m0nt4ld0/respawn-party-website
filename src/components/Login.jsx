import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

export default function Login({ setLogueado, setLogueadoAdmin, user, admin }) {
    return (
        <ButtonGroup className="mt-3">
            <Button
                variant={user ? "danger" : "primary"}
                onClick={setLogueado}
            >
                {user ? "Cerrar sesión" : "Iniciar sesión"}
            </Button>
            <Button
                variant={admin ? "danger" : "secondary"}
                onClick={setLogueadoAdmin}
            >
                {admin ? "Cerrar sesión Admin" : "Iniciar sesión Admin"}
            </Button>
        </ButtonGroup>
    );
}
