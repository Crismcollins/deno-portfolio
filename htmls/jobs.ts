import { Job, Language } from "../Supabase/index.ts";

export const jobsHtml = (jobs: Job[], language?: Language) => {
  const html = `
    <div class="form-container">
        <h1>Manage Jobs</h1>
        ${renderJob(undefined, language)}
        <!-- Job Items will be added here -->
        <div id="jobList">
          ${jobs.map(job => renderJob(job, language))}
        </div>
    </div>
  `

  return html;
}

const renderJob = (job?: Job, language?: Language) => {
  
  return `
  <form id="jobForm" method="POST" action="/manager/jobs">
  
  <!-- Title -->
  <div style="display: flex; flex-direction: column;">
    <label for="title-${job?.id ?? ''}">Title</label>
    <input type="text" id="title-${job?.id ?? ''}" name="title" value="${job?.title ?? ''}" placeholder="Title" required />
  </div>

  <!-- Company -->
  <div style="display: flex; flex-direction: column;">
    <label for="company-${job?.id ?? ''}">Company</label>
    <input type="text" id="company-${job?.id ?? ''}" name="company" value="${job?.company ?? ''}" placeholder="Company" required />
  </div>

  <!-- Language -->
  <div style="display: flex; flex-direction: column;">
    <label for="language-${job?.id ?? ''}">Language</label>
    <select id="language" name="language" required>
      <option value="es" ${job?.language === 'es' || language === 'es' ? 'selected' : ''}>Spanish</option>
      <option value="en" ${job?.language === 'en' || language === 'en' ? 'selected' : ''}>English</option>
    </select>
  </div>

  <!-- Start Date -->
  <div style="display: flex; flex-direction: column;">
    <label for="start_date-${job?.id ?? ''}">Start Date</label>
    <input type="date" id="start_date-${job?.id ?? ''}" name="start_date" value="${job?.start_date ?? ''}" placeholder="Start Date" required />
  </div>

  <!-- End Date -->
  <div style="display: flex; flex-direction: column;">
    <label for="end_date-${job?.id ?? ''}">End Date</label>
    <input type="date" id="end_date-${job?.id ?? ''}" name="end_date" value="${job?.end_date ?? ''}" placeholder="End Date" required />
  </div>

  <!-- Description -->
  <div style="display: flex; flex-direction: column;">
    <label for="description-${job?.id ?? ''}">Description</label>
    <textarea
      id="description-${job?.id ?? ''}"
      name="description"
      placeholder="Description"
      required
      style="padding: 10px; border: 1px solid #ddd; border-radius: 4px; height: 100px;"
    >${job?.description ?? ''}</textarea>
  </div>
  ${job ? '' : renderAddButton()}

  </form>
  ${job?.id ? renderDeleteButton(job?.id ?? '') : ''}
  `;
};

function renderAddButton() {
  return (`<button class="add-button" style="grid-column: span 3;" type="submit" class="add-job">Add Job</button>`)
} 
function renderDeleteButton(id: number) {
  return (`<button class="delete-button" style="grid-column: span 3;" type="button" onclick="${test(id)}">Delete Job</button>`)
}

const test = (id: number) => {
  console.log(id)
}
