import React, { Component } from 'react';

const List = ({ surname, gender, region, email, age }) => {
  return (
    <ul>
      <li>
        <span>{surname}</span>
      </li>
      <li>Email: {email}</li>
      <li>Age: {age}</li>
      <li>Gender: {gender}</li>
      <li>Country of origin: {region}</li>
    </ul>
  );
};

const Image = ({ photo }) => {
  return (
    <React.Fragment>
      <img className="avatar" src={photo} alt="" />
    </React.Fragment>
  );
};

const User = ({ name, displayDetails, user, index, remove }) => {
  return (
    <React.Fragment>
      <div
        className="names"
        onClick={() => {
          displayDetails(user, index);
        }}
      >
        {name}
        <button
          className="remove"
          onClick={() => {
            remove(index);
          }}
        >
          remove
        </button>
      </div>
    </React.Fragment>
  );
};

class Users extends Component {
  state = {
    allUser: [],
    selectedUser: [],
    error: false,
    loading: false,
    displayBox: false,
  };

  getData = () => {
    const url = 'http://uinames.com/api/?ext&amount=5';
    this.setState({ loading: true });
    fetch(url)
      .then(response => response.json())
      .then(users => this.setState({ allUser: users, loading: false }))
      .catch(err => {
        this.setState({ error: true, loading: false });
      });
  };

  displayDetails = (user, x) => {
    this.setState({ selectedUser: user, displayBox: true });
  };

  remove = index => {
    let allUser = [...this.state.allUser];
    allUser.splice(index, 1);
    this.setState({ allUser });
  };

  render() {
    const {
      loading,
      error,
      allUser,
      selectedUser: { photo, surname, region, gender, email, age },
      displayBox,
    } = this.state;
    if (loading) {
      return <div className="loading">Loading...</div>;
    }

    if (error) {
      return <div className="error">Oops something went wrong</div>;
    }

    return (
      <div className="container">
        <div className="navbar">
          <button onClick={this.getData}>Get Users</button>
        </div>
        <div className="parent">
          {this.state.allUser.length === 0 ? (
            <div className="no-data">there is no data ...</div>
          ) : (
            ''
          )}
          <div className="details">
            {displayBox > false ? (
              <div className="details-child">
                <Image photo={photo} />
                <List surname={surname} region={region} gender={gender} email={email} age={age} />
              </div>
            ) : null}
          </div>

          <div className="users">
            {allUser.map((item, index) => {
              return (
                <div key={index}>
                  <User
                    name={item.name}
                    user={item}
                    index={index}
                    displayDetails={this.displayDetails}
                    remove={this.remove}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Users;

// class Users extends Component {
//   state = {
//     loading: false,
//     error: false,
//     users: null,
//     user: null,
//   };
// ​
//   getUsers = () => {
//     const URL = 'http://uinames.com/api/?ext&amount=5';
//     this.setState({ loading: true });
//     fetch(URL)
//       .then(res => res.json())
//       .then(data => this.setState({ users: data, loading: false }))
//       .catch(err => this.setState({ error: true, loading: false }));
//   };
// ​
//   changeCurrentUser = name => {
//     const userValue = name;
//     const { users } = this.state;
//     const currentUser = users.filter(({ name }) => name === userValue);
//     this.setState({ user: currentUser });
//   };
// ​
//   render() {
//     console.log(this.state);
//     const { users, loading, error, user } = this.state;
// ​
//     if (loading) {
//       return <div>Loading...</div>;
//     }
// ​
//     if (error) {
//       return <div>Some error here</div>;
//     }
// ​
//     return (
//       <div>
//         <div>
//           <button onClick={() => this.getUsers()}>Get Users!</button>
//         </div>
//         <ul className="users-list">
//           {users ? (
//             users.map(({ name }, index) => (
//               <li key={index} className="user" onClick={event => this.changeCurrentUser(name)}>
//                 {name}
//               </li>
//             ))
//           ) : (
//             <li>No user to show yet...</li>
//           )}
//         </ul>
//         {user ? <User user={user} /> : null}
//       </div>
//     );
//   }
// }
