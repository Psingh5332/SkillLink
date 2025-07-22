import React from 'react'
import { Link } from 'react-router-dom'

// 
// {articles.map((Skills, index) => (
//   <tr key={Skills.id}>
//      <th scope="row">{index + 1}</th> {/* Dynamic Sr No */}
//      <td>{Skills.name}</td>
//      <td className='icons'>
//          <a href="#">
//              <i class="bi bi-pencil-square" title='edit'></i>
//          </a>
//          <a href="#">
//              <i class="bi bi-trash3" title='Delete'></i>
//          </a>
//      </td>
//   </tr>
// ))}

// 

function ManageSkills() {
    return (
        <div className=''>
            <div className="pb-2 border-bottom d-flex justify-content-between">
                <h2 className='fs-1 Bricolage-font'>
                    <i class="bi bi-pencil-square me-3"></i>
                    Skills
                </h2>
                <Link to="/dashboard/Skills/Create" className="btn btn-custom section-btn">Add</Link>
            </div>

            <div className="my-5 bg-white p-4 shadow-sm rounded-lg">
                <table class="table table-bordered shadow-sm p-3 mt-5">
                    <thead>
                        <tr>
                            <th scope="col">Sr No</th>
                            <th scope="col">Skill</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Dot Net Core</td>
                            <td className='icons'>
                                <a href="#">
                                    <i class="bi bi-pencil-square" title='edit'></i>
                                </a>
                                <a href="#">
                                    <i class="bi bi-trash3" title='Delete'></i>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default ManageSkills