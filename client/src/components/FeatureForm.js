import React, { Component } from "react";


class FeatureForm extends Component {

    render(){
        return(
            console.log("hello,there");
            <div className="feature-form-container">
                <form>
                    <label>
                        Name:
                        <input type="text" name="name" />
                    </label>
                </form>
            </div>
        );
    }

}

export default FeatureForm;