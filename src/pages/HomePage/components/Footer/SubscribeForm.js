import React, { Component } from "react";

export default class SubscribeForm extends Component {
  state = {
    userEmail: ""
  };

  handleChange = e => {
    this.setState({ userEmail: e.target.velue });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState({ userEmail: "" });
  };

  render() {
    const { userEmail } = this.state;

    return (
      <div className="subscribe-form__wrapper">
        <form className="subscribe-form" onSubmit={this.handleSubmit}>
          <input
            className="subscribe-form__input"
            type="email"
            name="email"
            value={userEmail}
            onChange={this.handleChange}
            placeholder="Enter your email"
          />

          <button className="subscribe-form__submit-btn" type="submit">
            Subscribe
          </button>
        </form>
      </div>
    );
  }
}
