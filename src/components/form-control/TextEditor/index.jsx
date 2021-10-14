import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import {Editor} from '@tinymce/tinymce-react'

TextEditor.propTypes = {
    name : PropTypes.string.isRequired,
    form : PropTypes.object.isRequired,

    label : PropTypes.string,
    disable : PropTypes.bool,
};

function TextEditor({name , form , label , disable , defaultValue =""}) {
    
    return (
        <Controller 
            name={name}
            control={form.control}
            render={
                ({onChange , value})=>{
                    const handleEditorChange = (editor) =>{
                        onChange(editor)
                    }
                    return <Editor
                        init={{
                            selector: "textarea",
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                              ],
                              toolbar: 'undo redo | formatselect | ' +
                              'bold italic backcolor | alignleft aligncenter ' +
                              'alignright alignjustify | bullist numlist outdent indent | ' +
                              'removeformat | help',
                              height:'500px'
                        }}
                        value={value}
                        onEditorChange={handleEditorChange}
                    />
                    }
            }

            disable={disable}
            label={label}
            defaultValue={defaultValue}
            error={false}
        />
    );
}

export default TextEditor;