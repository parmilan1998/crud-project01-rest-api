import { useEffect, useState } from 'react'
import './App.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  //State Changes
  const [users, setUsers] = useState([])
  const [newName, setNewName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newWebsite, setNewWebsite] = useState('')
  const [newCompany, setNewCompany] = useState('')

  //Fetch Free Fake REST API
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((json) => setUsers(json))
  }, [])

  //Add user user
  function addUser() {
    const name = newName.trim() //trim is used to remove the space when enter employee details
    const email = newEmail.trim()
    const website = newWebsite.trim()
    const company = newCompany.trim()

    if (name && email && website && company) {
      fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          website,
          company: {
            name: company,
          },
        }),
        headers: {
          'content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUsers([...users, data])
          toast.success('User added successfully!')
        })
      setNewName('')
      setNewEmail('')
      setNewWebsite('')
      setNewCompany('')
    } else {
      toast.error('Please fill in all the fields.')
    }
  }

  //Change input fields values
  function onChangeHandler(id, key, value) {
    setUsers((users) => {
      return users.map((user) => {
        return user.id === id ? { ...user, [key]: value } : user
      })
    })
  }

  //Update user
  function updateUser(id) {
    const user = users.find((user) => user.id === id)
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success('User update successfully!')
      })
  }

  //Delete User
  function deleteUser(id) {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers((users) => {
          return users.filter((user) => user.id !== id)
        })
        toast.success('User delete successfully!')
      })
  }

  return (
    <div className='App'>
      <h1 className='py-5 text-xl font-popins text-sky-500 font-semibold text-center'>
        Company Employee Details
      </h1>
      <table className='table-auto my-5 border-collapse border border-slate-500 font-popins'>
        <thead>
          <tr className='bg-indigo-500 text-white'>
            <th className='border border-slate-600 px-5 py-3'>ID</th>
            <th className='border border-slate-600 px-5 py-3'>Name</th>
            <th className='border border-slate-600 px-5 py-3'>Email</th>
            <th className='border border-slate-600 px-5 py-3'>Website</th>
            <th className='border border-slate-600 px-5 py-3'>Company Name</th>
            {/* <th className='border border-slate-600 px-5 py-3'>City</th> */}
            <th className='border border-slate-600 px-5 py-3'>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className='border border-slate-600 px-4 py-2'>{user.id}</td>
              <td className='border border-slate-600 px-4 py-2 text-left'>
                {user.name}
              </td>
              <td className='border border-slate-600 px-4 py-2'>
                <input
                  onChange={(value) => onChangeHandler(user.id, 'email', value)}
                  value={user.email}
                  className='px-2 py-1'
                />
              </td>
              <td className='border border-slate-600 px-4 py-2'>
                <input
                  onChange={(value) =>
                    onChangeHandler(user.id, 'website', value)
                  }
                  value={user.website}
                  className='px-2 py-1'
                />
              </td>
              <td className='border border-slate-600 px-4 py-2'>
                <input
                  onChange={(value) =>
                    onChangeHandler(user.id, 'company.name', value)
                  }
                  value={user.company.name}
                  className='px-2 py-1 border-slate-400'
                />
              </td>{' '}
              {/* <td className='border border-slate-600 px-4 py-2'>
                <input value={user.address.city} className='px-2 py-1' />
              </td> */}
              <td className='border border-slate-600 px-4 py-2'>
                <button
                  className=' bg-blue-500 text-white px-3 py-1 m-1 rounded hover:bg-blue-800'
                  onClick={() => updateUser(user.id)}
                >
                  Update
                </button>
                <button
                  className=' bg-red-500 text-white px-3 py-1 rounded hover:bg-red-800'
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td className='border border-slate-600'>
              <input
                type='text'
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder='Enter new name'
                className='px-2 py-1 m-2 border-slate-400'
              />
            </td>
            <td className='border border-slate-600'>
              <input
                type='text'
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder='Enter new email'
                className='px-2 py-1 m-2 border-slate-400'
              />
            </td>
            <td className='border border-slate-600'>
              <input
                type='text'
                value={newWebsite}
                onChange={(e) => setNewWebsite(e.target.value)}
                placeholder='Enter new website'
                className='px-2 py-1 m-2 border-slate-400'
              />
            </td>
            <td className='border border-slate-600'>
              <input
                type='text'
                value={newCompany}
                onChange={(e) => setNewCompany(e.target.value)}
                placeholder='Enter new company'
                className='px-2 py-1 m-2 border-slate-400'
              />
            </td>
            <td>
              <button
                className=' bg-green-500 text-white px-3 py-1 m-1 rounded hover:bg-green-800'
                onClick={addUser}
              >
                Add User
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
      <ToastContainer position='top-center' autoClose={3000} theme='colored' />
    </div>
  )
}

export default App
