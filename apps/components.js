/**
 * Author: Arkady Zelensky
 */

import React from 'react';

export const Label = ({forInput, title, width}) => {
  return (<div className={`col-${width ? width : 2} col-sm-5 col-md-3`}>
            <label for={forInput}> {title} </label>
          </div>)  
}

export const TextInput = ({name, onInput, type, min, required}) => {
  return (<div className="col-sm-5 col-md-3">
            <input type={ type ? type: 'text' } id={name} name={name} 
                 className="form-control" required={required === false ? false : true} maxLength={45}
                 minLength={min ? min : 6}
                 onChange={(e) => onInput(e, name)}/>
        </div>)
}

export const Checkbox = ({title, name, checked, onChange}) => {
  return (<div class="form-group form-check">
            <input type="checkbox" class="form-check-input" name={name}
                   id={name} checked={checked} onChange={(e) => onChange(e, name)}/>
            <label class="form-check-label" for={name}>{title}</label>
          </div>)  
}
export const SubmitButton = ({title}) => {
  return <input class="btn btn-primary" type="submit" value={title ? title : 'Submit'}/>
}


export const DangerAlert = ({text}) => {
  return <div class="alert alert-danger col-5" role="alert">{text}</div>
}

export const SuccessAlert = ({text}) => {
  return <div class="alert alert-success col-5" role="alert">{text}</div>
}