import { IProps, ITodo } from "../../../Model/models";
import { Button } from "../../button/Button.component";
import styles from './DisplayTasks.module.css';


const DisplayTasks:React.FC<IProps> = (props: IProps)=> {
	return (
		<div>
			{props.tasks
				.map((todo: ITodo , index: number) => (
					<div key={index} className={`container flex-column ${styles.task_container}`}>
						<input type="checkbox" name="checkbox" id={todo._id} onClick={()=>props.updateTasks(todo._id,todo.completed)} />
						<label htmlFor={todo._id} className={`${styles.task}`}>
							{todo.name}
						</label>

						<Button
							text={'Delete'}
							onClick={() => {
								props.deleteTasks(todo._id);
							}}
						/>
					</div>
				))
				.reverse()}
		</div>
	);
}

export default DisplayTasks;
