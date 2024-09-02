import { User } from "../Supabase/index.ts";

export const UserHtml = (user: User) => {
  const editUserURL = '/manager/user'
  
  return (
    `
	<div class="form-container">
	    <h1>${user?.full_name ? user.full_name : 'Create User'}</h1>
	    <form id="form" method="POST" action="${editUserURL}">
          <input type="hidden" name="_method" value="PATCH">
          <input type="hidden" name="id" value="${user.id}">
	        <!-- Full Name -->
	        <div class="form-item">
	            <label for="full_name">Full Name:</label>
	            <input type="text" value="${user?.full_name}" id="full_name" name="full_name" required placeholder="Enter your full name">
	        </div> 
	        <!-- Profession -->
	        <div class="form-item">
	            <label for="profession">Profession:</label>
	            <input type="text" value="${user?.profession}" id="profession" name="profession" required placeholder="Enter your profession">
	        </div> 
	        <!-- Alias -->
	        <div class="form-item">
	            <label for="alias">Alias:</label>
	            <input type="text" value="${user?.alias}" id="alias" name="alias" required placeholder="Enter your alias">
	        </div> 
	        <!-- Email -->
	        <div class="form-item">
	            <label for="email">Email:</label>
	            <input type="email" value="${user?.email}" id="email" name="email" required placeholder="Enter your email">
	        </div> 
	        <!-- LinkedIn URL -->
	        <div class="form-item">
	            <label for="linkedin_url">LinkedIn URL:</label>
	            <input type="url" value="${user?.linkedin_url}" id="linkedin_url" name="linkedin_url" required placeholder="Enter your LinkedIn URL">
	        </div> 
	        <!-- Study Title -->
	        <div class="form-item">
	            <label for="study_title">Study Title:</label>
	            <input type="text" value="${user?.study_title}" id="study_title" name="study_title" required placeholder="Enter your study title">
	        </div> 
	        <!-- Language -->
	        <div class="form-item">
	            <label for="language">Language:</label>
	            <select id="language" value="${user?.language ?? 'en'}" name="language" required>
	                <option value="es" ${user?.language === 'es' ? 'selected' : ''}>Spanish</option>
	                <option value="en" ${user?.language === 'en' ? 'selected' : ''}>English</option>
	            </select>
	        </div> 
	        <!-- About Me -->
	        <div class="form-item" style="grid-column: span 2;">
	            <label for="about_me">About Me:</label>
	            <textarea id="about_me" name="about_me" required placeholder="Tell us about yourself">${user?.about_me}</textarea>
	        </div> 
	        <!-- Submit Button -->
	        <button class="update-button" type="submit">Update user</button>
	    </form>
	</div>
`
  )
}
