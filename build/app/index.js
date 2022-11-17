/** @jsx React.DOM */

const Line = React.createClass({
  render: function () {
    return (
      <div className="line">
        <span>{this.props.children}</span>
        <input type={this.props.type} ref={this.props.ref} />
      </div>
    )
  },
})

const Form = React.createClass({
  getInitialState: function () {
    return {
      name: '',
      email: '',
      password: '',
      country: '',
      countries: [],
      isLoading: false,
    }
  },

  loadCountries: function () {
    this.setState({ isLoading: true });

    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((json) => {
        setTimeout(() => {
          this.setState({
            countries: json.map((el) => el.name.common),
            isLoading: false,
          });
        }, 1000)
      });
  },

  selectCountry: function (event) {
    this.setState({
      country: event.target.value
    });
  },

  handleSubmit: function (event) {
    event.preventDefault();
    const email = this.refs.email.refs.email.state.value;
    const name = this.refs.name.refs.name.state.value;
    const password = this.refs.password.refs.password.state.value;

    this.setState({
      email,
      name,
      password,
    });
  },

  render: function () {
    console.log('==========>render');

    return (
      <Box>
        <form onSubmit={this.handleSubmit}>
          <button onClick={this.loadCountries} type="button">Load Countries</button>

          {this.state.isLoading ? (
            <span>Loading ...</span>
          ) : (
            <select onChange={this.selectCountry}>
              {this.state.countries.map((el) => (
                <option>
                  {el}
                </option>
              ))}
            </select>
          )}

          <Line type="email" ref="email">Email:</Line>
          <Line type="text" ref="name">Name:</Line>
          <Line type="password" ref="password">Password:</Line>
          <button type="submit">Submit</button>
        </form>
        <div className="user">
          <span>Email: {this.state.email}</span>
          <span>Name: {this.state.name}</span>
          <span>Password: {this.state.password}</span>
          <span>Country: {this.state.country}</span>
        </div>
      </Box>
    );
  }
})

const Box = React.createClass({
  render: function () {
    return (
      <div className="box">
        {this.props.children}
      </div>
    );
  }
})

const App = React.createClass({
  render: function() {
    return (
      <div className="app">
        <Form />
      </div>
    );
  }
})

React.renderComponent(
  <App />,
  document.getElementById('example')
);
