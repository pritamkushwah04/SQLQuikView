import React from 'react';
import './IntroComponent.css'
function IntroComponent() {
    return (
        <div className="intro-page">
            <h1>Welcome to Your SQL Application</h1>
            <p>Follow these steps to get started:</p>

            <h2>1. Open a Table</h2>
            <p>Click on "Open Table" from the navbar to begin.</p>

            <h2>2. Choose a Table</h2>
            <p>From the dropdown menu, select an existing table.</p>

            <h2>3. Schema View</h2>
            <p>You will be shown the schema of the selected table.</p>

            <div className="important-note">
                <h2>4. Show Whole Table</h2>
                <p>If you want to see the entire table, click the "Show Table" button.</p>
                <p className="warning">IMPORTANT: Please read the instructions first, as the table tab will be rendered on this component.</p>
            </div>

            <h2>5. Popular Query Options</h2>
            <p>In the navbar, you have the "Popular Query Options" section. Here, common queries are displayed. Hover over a query name and click to copy it to your textArea. 😎 But wait, there's a CLI option for it as well! 💻</p>

            <h2>6. Recent Queries</h2>
            <p>Also in the navbar, you have the "Recent Queries" option. This will display all the queries processed by you in this session, with the most recently executed query at the top.</p>

            <h2>7. TextArea Shortcuts</h2>
            <p>Use these shortcuts in the textArea:</p>
            <ul>
                <li>/&lt;Popular query name&gt; (e.g., /SELECT) to quickly insert a popular query.</li>
                <li>Press SHIFT+ENTER to run the query.</li>
            </ul>

            <h2>8. Export to CSV</h2>
            <p>If you've executed a query and stumbled upon a result so important that you want to keep it for later, don't worry! We've got your back. 🎉 Just click the "EXPORT TO CSV" option, and tada! Your currently opened table is downloaded in CSV format. 💾</p>

            <p>Now you're ready to start using your SQL application. Enjoy querying!</p>


        </div>

    );
}

export default IntroComponent;