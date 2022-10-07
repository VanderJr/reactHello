
export async function getAllEmployees() {
    return await fetch("http://localhost:3000/employees")
        .then(res => res.json())
        .then(
            (result) => {
                return result;
            },
            (error) => {
                // throw new Response("", {
                //     status: 404,
                //     statusText: "Erro ao buscar dados",
                // });
                console.log('tratar erros')
                console.log(error);
                return [];
            }
        )
}
export async function getEmployee(id) {
    return await fetch(`http://localhost:3000/employees/${id}`)
        .then(res => res.json())
        .then(
            (result) => {
                return result;
            },
            (error) => {
                console.log('tratar erros')
                console.log(error);
            }
        )
}

export async function updateEmployee(id, updates) {
    return await fetch(`http://localhost:3000/employees/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
    })
        .then(res => res.json())
        .then(
            (result) => {
                return result;
            },
            (error) => {
                console.log('tratar erros')
                console.log(error);
            }
        )
}

export async function createEmployee(employee) {
    return await fetch(`http://localhost:3000/employees/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
    })
        .then(res => res.json())
        .then(
            (result) => {
                return result;
            },
            (error) => {
                console.log('tratar erros')
                console.log(error);
            }
        )
}

export async function deleteEmployee(id) {
    return await fetch(`http://localhost:3000/employees/${id}`, {
        method: 'DELETE',
    })
        .then(res => res.json())
        .then(
            (result) => {
                return result;
            },
            (error) => {
                console.log('tratar erros')
                console.log(error);
            }
        )
}