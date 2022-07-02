import React, {Component} from 'react';

import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppNavbar from './components/Navbar';
import { Container } from 'reactstrap';
import ShoppingList from './components/ShoppingList';
import AddForm from './components/AddForm';
import { loadUser } from './actions/authActions';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar/>
        <Container>
          <AddForm/>
          <ShoppingList/>
        </Container>
      </div>
    </Provider>
  );
}
}
export default App;