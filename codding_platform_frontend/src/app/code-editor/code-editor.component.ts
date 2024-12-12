import { Component, OnInit } from '@angular/core';
import { ProblemService } from '../problems/problem.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements OnInit {
  codeInput: string = '';
  codeOutput: string = '';
  activeTab: string = 'test-case-1';
  problemId: string | null = null;
  testCases: any[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private problemService: ProblemService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.problemId = this.route.snapshot.paramMap.get('id');
    if (this.problemId) {
      this.fetchTestCases(this.problemId);
    }
  }

  fetchTestCases(id: string): void {
    this.isLoading = true;
    this.problemService.getProblemDetails(id).subscribe({
      next: (data) => {
        this.testCases = data.test_cases;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Unable to load test cases. Try again later.';
        this.isLoading = false;
        console.error('Error:', err);
      }
    });
  }

  runCode(): void {
    this.codeOutput = 'Running code...\n';
    this.testCases.forEach((testCase, index) => {
      const output = this.mockRunTestCase(this.codeInput, testCase);
      this.codeOutput += `Test Case ${index + 1}:\nInput: ${testCase.input}\nExpected: ${testCase.output}\nOutput: ${output}\n\n`;
    });
  }

  mockRunTestCase(code: string, testCase: any): string {
    // Mock execution of the provided code with a test case.
    return `Simulated result for input: ${testCase.input}`;
  }

  switchTab(tabId: string): void {
    this.activeTab = tabId;
  }
}
