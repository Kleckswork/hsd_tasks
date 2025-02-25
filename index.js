import { DatabaseSync } from 'node:sqlite';
import express from "express";

const database = new DatabaseSync(':memory:');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Erstellt die Tabelle
database.exec(`
    CREATE TABLE "tasks"
    (
        "id"          INTEGER,
        "title"       TEXT,
        "description" TEXT,
        "completed"   INTEGER,
        PRIMARY KEY ("id" AUTOINCREMENT)
    )
`);

app.listen(PORT, () => {
    console.log("Server is listening on port:", PORT);
});

app.get('/state', (request, response) => {
    response.send({
        "state": "running"
    });
});

app.get('/tasks', (request, response) => {
    const tasks = database.prepare('SELECT * FROM tasks').all();

    tasks.forEach(task => {
        task.completed = !!task.completed;
    });
    response.send(tasks);
});

app.post('/tasks', (request, response) => {
    const { title, description, completed } = request.body;

    if (!title) {
        return response.status(400).send(
            {"message": "Title is required"}
        );
    }

    database.prepare('INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)').run(title, description || '', (completed ? 1 : 0));
    response.send({
        "message": "Task created"
    });
});

app.get('/tasks/:id', (request, response) => {
    const task = database.prepare('SELECT * FROM tasks WHERE id = ?').get(request.params.id);

    if (!task) {
        return response.status(404).send(
            {"message": "Task " + request.params.id + " not found"}
        );
    }

    task.completed = !!task.completed;
    response.send(task);
});

app.put('/tasks/:id', (request, response) => {
    const task = database.prepare('SELECT * FROM tasks WHERE id = ?').get(request.params.id);

    if (!task) {
        return response.status(404).send(
            {"message": "Task " + request.params.id + " not found"}
        );
    }

    const { title, description, completed } = request.body;

    if (!title) {
        return response.status(400).send(
            {"message": "Title is required"}
        );
    }

    database.prepare('UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?').run(title, description || '', (completed ? 1 : 0), request.params.id);
    response.send({
        "message": "Task " + request.params.id + " updated"
    });
});

app.delete('/tasks/:id', (request, response) => {
    const task = database.prepare('SELECT * FROM tasks WHERE id = ?').get(request.params.id);

    if (!task) {
        return response.status(404).send(
            {"message": "Task " + request.params.id + " not found"}
        );
    }

    database.prepare('DELETE FROM tasks WHERE id = ?').run(request.params.id);
    response.send({
        "message": "Task " + request.params.id + " deleted"
    })
});