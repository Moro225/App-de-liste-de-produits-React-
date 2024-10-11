export function Checkbox({checked, label, onChange, id}){

    return <div className="form-check my-2">
        <input 
            type="checkbox"
            className="form-check-input"
            id="" 
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}    
        />
        <label htmlFor={id}>{label}</label>
    </div>
}