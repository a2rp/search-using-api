import React from 'react'
import Header from '../../components/header'

// this component is called to display homepage
const Home = () => {
    return (
        <div>
            {/* header component is common for all pages */}
            <Header />
            <h1>Welcome to Full-Stack Application Home Page</h1>
        </div>
    )
}

export default Home

