import React, { useState } from "react";
import TaskEditor from "components/TaskEditor/TaskEditor";
import { useTaskDispatch } from "contexts/TaskContext";
import { css } from "emotion";

const detailStyle = css`
    display: block;
    padding-bottom: 0.4em;
`;

const Task = ({ task }) => {
    const dispatch = useTaskDispatch();
    const [isEditing, setIsEditing] = useState(false);

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleDelete = () => {
        dispatch({ type: "DELETE", task });
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleDone = () => {
        dispatch({ type: "UPDATE", task: { ...task, done: !task.done } });
    };

    return (
        <li
            className={css`
                padding-bottom: 1.4em;
            `}
        >
            {isEditing ? (
                <TaskEditor handleCancel={handleCancel} editTask={task} />
            ) : (
                <>
                    <span
                        className={
                            task.done
                                ? css`
                                      ${detailStyle}
                                      text-decoration: line-through;
                                  `
                                : detailStyle
                        }
                    >
                        {task.name}
                    </span>
                    <button onClick={handleDone}>
                        {task.done ? "Re-open" : "Complete"}
                    </button>
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </>
            )}
        </li>
    );
};

export default Task;
