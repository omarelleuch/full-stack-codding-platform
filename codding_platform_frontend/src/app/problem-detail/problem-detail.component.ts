import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProblemService } from '../problems/problem.service';

@Component({
  selector: 'app-problem-detail',
  templateUrl: './problem-detail.component.html',
  styleUrls: ['./problem-detail.component.css']
})
export class ProblemDetailComponent implements OnInit {
  problem: any = {}; // Initialize as empty object
  isLoading = true;  // Loading state
  error: string | null = null;  // Error state

  constructor(
    private route: ActivatedRoute, 
    private problemService: ProblemService  // Inject your service to fetch data
  ) { }

  ngOnInit(): void {
    const problemId = this.route.snapshot.paramMap.get('id');  // Get the ID from the route
    if (problemId) {
      this.fetchProblemDetails(problemId);  // Fetch details using the ID
    }
  }

  fetchProblemDetails(id: string): void {
    this.isLoading = true;  // Set loading to true
    this.error = null;  // Reset error state
    
    this.problemService.getProblemDetails(id).subscribe({
      next: (data) => {
        this.problem = data;
        console.log('Problem Details:', data); // Log the entire problem details to the console

        // Check if specific fields exist and handle null or undefined values
        this.problem.hints = this.problem.hints ? this.problem.hints : [];  // If null or undefined, set to empty array
        this.problem.similar_questions = this.problem.similar_questions ? this.problem.similar_questions : [];  // Handle null/undefined for similar_questions
        this.problem.test_cases = this.problem.test_cases ? this.problem.test_cases : [];  // Handle null/undefined for test_cases

        // Log the values
        console.log('Hints:', this.problem.hints);
        console.log('Similar Questions:', this.problem.similar_questions);
        console.log('Test Cases:', this.problem.test_cases);

        this.problem.similar_questions_text = this.problem.similar_questions_text
          ? this.problem.similar_questions_text.split(',')
          : [];

        // If 'topic_tags' is a comma-separated string, convert it to an array
        if (this.problem.topic_tags) {
          this.problem.topic_tags = this.problem.topic_tags.split(',');  // Convert the comma-separated string to an array
        }

        this.isLoading = false;  // Set loading to false when data is loaded
      },
      error: (error) => {
        this.isLoading = false;  // Set loading to false on error
        this.error = 'Error fetching problem details. Please try again later.';  // Set error message
        console.error('Error fetching problem details', error);
      }
    });
  }
}
