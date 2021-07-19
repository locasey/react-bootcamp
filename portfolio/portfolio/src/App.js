import React, { Component } from 'react';

class App extends Component {
    state = { displayBio: false };

    /* constructor() {
        super(); //Inheritance
        this.state = { displayBio: false };
        //console.log('Component this', this);

        this.toggleDisplayBio = this.toggleDisplayBio.bind(this);

    } */

    //Directly initalize method
    toggleDisplayBio = () => {
        this.setState({ displayBio: !this.state.displayBio }); //use set state
    }

    //Keep this in traditional syntax
    render() {
        return (
            <div>
                <h1>Hello!</h1>
                <p>My name is Liam</p>
                <p>Working on front end dev</p>
                {this.state.displayBio ? (
                    <div>
                        <p>I live in NOVA, </p>
                        <p>My favorite language is python</p>
                        <p>I also love running and cooking</p>
                        <button onClick={this.toggleDisplayBio}>Say less</button>
                    </div>
                ) : (
                    <div>
                        <button onClick={this.toggleDisplayBio}> Read more </button>
                    </div>
                )
                }
            </div>
        )
    }
}

export default App;