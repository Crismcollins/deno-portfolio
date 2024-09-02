export const CreateUserHtml = () => {
	const createUserURL = '/manager/create-user';

	return (
		`
	<div class="form-container">
	    <h1>Create User</h1>
	    <form id="form" method="POST" action="${createUserURL}">
	        <!-- Full Name -->
	        <div class="form-item">
	            <label for="full_name">Full Name:</label>
	            <input type="text" id="full_name" name="full_name" required placeholder="Enter your full name">
	        </div> 
	        <!-- Profession -->
	        <div class="form-item">
	            <label for="profession">Profession:</label>
	            <input type="text" id="profession" name="profession" required placeholder="Enter your profession">
	        </div> 
	        <!-- Alias -->
	        <div class="form-item">
	            <label for="alias">Alias:</label>
	            <input type="text" id="alias" name="alias" required placeholder="Enter your alias">
	        </div> 
	        <!-- Email -->
	        <div class="form-item">
	            <label for="email">Email:</label>
	            <input type="email" id="email" name="email" required placeholder="Enter your email">
	        </div> 
	        <!-- LinkedIn URL -->
	        <div class="form-item">
	            <label for="linkedin_url">LinkedIn URL:</label>
	            <input type="url" id="linkedin_url" name="linkedin_url" required placeholder="Enter your LinkedIn URL">
	        </div> 
	        <!-- Study Title -->
	        <div class="form-item">
	            <label for="study_title">Study Title:</label>
	            <input type="text" id="study_title" name="study_title" required placeholder="Enter your study title">
	        </div> 
	        <!-- Language -->
	        <div class="form-item">
	            <label for="language">Language:</label>
	            <select id="language" value="en" name="language" required>
	                <option value="es">Spanish</option>
	                <option value="en" selected>English</option>
	            </select>
	        </div> 
	        <!-- About Me -->
	        <div class="form-item" style="grid-column: span 2;">
	            <label for="about_me">About Me:</label>
	            <textarea id="about_me" name="about_me" required placeholder="Tell us about yourself"></textarea>
	        </div> 
	        <!-- Submit Button -->
	        <button class="add-button" type="submit">Create user</button>
	    </form>
	</div>
`
	)
}