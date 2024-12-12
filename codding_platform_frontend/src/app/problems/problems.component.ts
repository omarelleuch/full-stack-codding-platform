import { Component, OnInit } from '@angular/core';
import { ProblemService } from './problem.service';

@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.css']
})
export class ProblemsComponent implements OnInit {
  problems: any[] = [];
  newProblem = { title: '', description: '', difficulty: '' };

  constructor(private problemService: ProblemService) {}

  ngOnInit(): void {
    this.loadProblems();  // Load problems when the component is initialized
  }

  // Method to get all problems from the Django API
  loadProblems() {
    this.problemService.getProblems().subscribe(data => {
      this.problems = data;  // Store the problems in the component
    });
  }
}
