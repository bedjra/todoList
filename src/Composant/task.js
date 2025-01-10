import React, { useState } from "react";
import "./task.css";

const Task = () => {
  const [tasks, setTasks] = useState([
    { id: 1, titre: "Tâche 1", description: "Description de la tâche 1", date: "2024-12-27", priorite: "Haute" },
    { id: 2, titre: "Tâche 2", description: "Description de la tâche 2", date: "2024-12-28", priorite: "Moyenne" },
    { id: 3, titre: "Tâche 3", description: "Description de la tâche 3", date: "2024-12-29", priorite: "Basse" },
  ]);

  const [completedTasks, setCompletedTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    titre: "",
    description: "",
    date: "",
    priorite: "",
  });
  
  const [showCompleted, setShowCompleted] = useState(false); // État pour afficher/masquer les tâches accomplies

  // Gestion des champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.titre && newTask.description && newTask.date && newTask.priorite) {
      if (newTask.id) {
        // Mise à jour de la tâche existante
        setTasks(tasks.map(task => task.id === newTask.id ? newTask : task));
      } else {
        // Générer l'ID automatiquement
        const newId = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
        const taskToAdd = { ...newTask, id: newId };
        setTasks([...tasks, taskToAdd]);
      }
      setNewTask({ titre: "", description: "", date: "", priorite: "" }); // Réinitialisation du formulaire
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  // Fonction pour remplir le formulaire avec les données de la tâche sélectionnée
  const handleEdit = (task) => {
    setNewTask(task);
  };

  // Fonction pour supprimer une tâche
  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Fonction pour marquer une tâche comme accomplie
  const handleComplete = (task) => {
    // Ajouter la tâche aux tâches accomplies
    setCompletedTasks([...completedTasks, task]);
    // Supprimer la tâche des tâches en cours
    setTasks(tasks.filter(t => t.id !== task.id));
  };

  // Fonction pour afficher/masquer les tâches accomplies
  const toggleCompletedTasks = () => {
    setShowCompleted(!showCompleted);
  };

  return (
    <div>
      <h1>Formulaire d'ajout</h1>

      {/* Formulaire d'ajout de tâche */}
      <form onSubmit={handleSubmit} className="form-ajout">
        <input
          type="text"
          name="titre"
          placeholder="Titre de la tâche"
          value={newTask.titre}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newTask.description}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          placeholder="Date"
          value={newTask.date}
          onChange={handleChange}
          required
        />
        <select
          name="priorite"
          value={newTask.priorite}
          onChange={handleChange}
          required
        >
          <option value="">Choisir la priorité</option>
          <option value="Haute">Haute</option>
          <option value="Moyenne">Moyenne</option>
          <option value="Basse">Basse</option>
        </select>
        <button type="submit">Ajouter</button>
      </form>

      {/* Bouton pour afficher/masquer les tâches accomplies */}
      <button onClick={toggleCompletedTasks}>
        {showCompleted ? "Afficher les tâches en cours" : "Afficher les tâches accomplies"}
      </button>

      {/* Si showCompleted est true, afficher les tâches accomplies */}
      {showCompleted ? (
        <div className="arr">
          <h2>TACHES COMPLETES</h2>
          <table border="1">
            <thead>
              <tr>
                <th>ID</th>
                <th>Titre</th>
                <th>Description</th>
                <th>Date</th>
                <th>Priorité</th>
              </tr>
            </thead>
            <tbody>
              {completedTasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>{task.titre}</td>
                  <td>{task.description}</td>
                  <td>{task.date}</td>
                  <td>{task.priorite}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // Afficher les tâches en cours par défaut
        <div className="arr">
          <h2>TACHES EN COURS</h2>
          <table border="1">
            <thead>
              <tr>
                <th>ID</th>
                <th>Titre</th>
                <th>Description</th>
                <th>Date</th>
                <th>Priorité</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>{task.titre}</td>
                  <td>{task.description}</td>
                  <td>{task.date}</td>
                  <td>{task.priorite}</td>
                  <td>
                    <div className="action-buttons">
                      <img
                        src="/images/edi.png"
                        alt="Modifier"
                        className="action-icon"
                        onClick={() => handleEdit(task)} // Remplir le formulaire avec la tâche à modifier
                      />
                      <img
                        src="/images/sup.png"
                        alt="Supprimer"
                        className="action-icon"
                        onClick={() => handleDelete(task.id)} // Supprimer la tâche
                      />
                      <img
                        src="/images/R.jpg"
                        alt="Completed"
                        className="action-icon"
                        onClick={() => handleComplete(task)} // Marquer la tâche comme terminée
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Task;
