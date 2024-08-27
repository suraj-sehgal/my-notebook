import React from 'react';
import './AboutPage.css';  // Import the CSS file

const About = () => {
    return (
        <div className="about-container">
            <div className="about-header">
                <h1>About MyNotebook</h1>
                <p>Your go-to solution for managing and organizing your notes seamlessly.</p>
            </div>
            <div className="about-content">
                <section className="about-section">
                    <h2>What is MyNotebook?</h2>
                    <p>
                        MyNotebook is an innovative web application designed to help you keep track of your notes efficiently.
                        Whether you're jotting down quick reminders or drafting detailed notes, MyNotebook provides a
                        user-friendly platform to create, edit, and access your notes with ease.
                    </p>
                </section>
                <section className="about-section">
                    <h2>Features</h2>
                    <ul>
                        <li><i className="fa-solid fa-pencil-alt"></i> Create and edit notes</li>
                        <li><i className="fa-solid fa-list-ul"></i> Organize your notes with tags</li>
                        <li><i className="fa-solid fa-search"></i> Search notes effortlessly</li>
                        <li><i className="fa-solid fa-save"></i> Save notes securely</li>
                    </ul>
                </section>
                <section className="about-section">
                    <h2>Our Mission</h2>
                    <p>
                        At MyNotebook, our mission is to simplify the process of note-taking and ensure that you can always
                        access your important information when you need it. We are committed to providing a seamless and
                        enjoyable user experience with our application.
                    </p>
                </section>
                <section className="about-section">
                    <h2>Contact Us</h2>
                    <p>
                        Have questions or feedback? Feel free to reach out to us at <a href="mailto:surajsehgalynnus@gmail.com">surajsehgalynnus@gmail.com</a>.
                    </p>
                </section>
            </div>
        </div>
    );
}

export default About;
