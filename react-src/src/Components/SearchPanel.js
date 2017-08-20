import React, {Component} from 'react';

class SearchPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      focus: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  handleChange(event) {
    this.setState({searchValue: event.target.value});
  }

  handleSubmit(event) {
    this.props.addStock(this.state.searchValue, "search");
    this.setState({searchValue: ""});
    event.preventDefault();
  }

  handleFocus() {
    this.setState({ focus: !this.state.focus });
  }
  

  render() {
    let {
      name,
      notFound
    } = this.props;
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">{name}</h3>
        </div>
        <div className="panel-body">
          <form onSubmit={this.handleSubmit}>
            <div className="input-group">
              <input onFocus={this.handleFocus} onBlur={this.handleFocus} value={this.state.searchValue} onChange={this.handleChange} type="text" name="filterterm" className="form-control"/>
              <span className="input-group-btn">
                <button type="submit" className="btn btn-info ">Add</button>
              </span>
            </div>
          </form>
          { notFound && !this.state.focus &&
            <p id="notFound" className="text-danger">Please enter a valid stock symbol</p>
          }
        </div>
      </div>
    );
  }
}

export default SearchPanel;
