import React from 'react'
import {Field, reduxForm} from "redux-form";
import {Link} from 'react-router-dom'

class StreamForm extends React.Component {
    renderError({error, touched}) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="ui header">
                        {error}
                    </div>
                </div>
            )
        }
    }

    renderTextInput = ({input, label, meta}) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`
        return  (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off"/>
                {this.renderError(meta)}
            </div>
        )
    }

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues)
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">

                <Field name="title" label="Enter Title" component={this.renderTextInput}/>
                <Field name="description" label="Enter Description" component={this.renderTextInput}/>

                <Link to="/" className="button ui dark">Back</Link>
                <button type="submit" className="button ui primary">
                    Submit
                </button>
            </form>
        )
    }
}

const validate = formValues => {
    const errors = {};

    if (!formValues.title) {
        // only if the user did not enter a title
        errors.title = 'You must enter a title'
    }

    if (!formValues.description) {
        // only if the user did not enter a description
        errors.description = 'You must enter a description'
    }

    return errors;
}


export default reduxForm({
    form: 'streamForm',
    validate: validate
})(StreamForm)

