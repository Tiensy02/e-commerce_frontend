
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import './index.css'
/**
 * @param {Number} inTaskNumber: đang ở task thứ bao nhiêu
 * @param {Array} tasks :['task1','task2','task3'] chuỗi các công việc liên tiếp 
 */
export default function Process({tasks,inTaskNumber }) {
    return (
        <div className="d-flex flex-column mt-5 rounded process_box">
            {tasks.map((task, index) => {
                return (
                    <div key={index} className={`d-flex process_wrap mb-3 ${index<inTaskNumber ? 'active':''}`}>

                        {index < inTaskNumber ? <CheckCircleIcon color='primary'/> : <DonutLargeIcon color='primary' />} 
                        <p className= {`ms-3 ${index < inTaskNumber ? 'fw-bold':''}`}>{task}</p>
                    </div>
                )
            })}
        </div>
    )
}