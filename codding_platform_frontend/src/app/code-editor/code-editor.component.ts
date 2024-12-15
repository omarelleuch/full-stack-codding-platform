import { Component, OnInit } from '@angular/core';
import { ProblemService } from '../problems/problem.service';
import { ActivatedRoute } from '@angular/router';

interface TestCase {
  input: string;
  output: string;
  status?: 'passed' | 'failed' | 'pending'; // Add pending as a default status
}

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements OnInit {
  codeInput: string = '';
  codeOutput: string = '';
  activeTab: string = 'test-case-0';
  problemId: string | null = null;
  testCases: TestCase[] = [];
  isLoading = true;
  error: string | null = null;
  selectedLanguage: string = 'python';
  supportedLanguages: string[] = ['python', 'javascript', 'cpp', 'java'];

  constructor(private problemService: ProblemService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.problemId = this.route.snapshot.paramMap.get('id');
    if (this.problemId) {
      this.fetchTestCases(this.problemId);
    }
    this.loadSavedCode();
  }

  fetchTestCases(id: string): void {
    this.isLoading = true;
    this.problemService.getProblemDetails(id).subscribe({
      next: (data) => {
        if (data.test_cases && Array.isArray(data.test_cases)) {
          this.testCases = data.test_cases.map((tc: TestCase) => ({
            ...tc,
            input: this.convertToJson(tc.input), // Convert input to valid JSON
            status: 'pending', // Initialize status as 'pending'
          }));
        } else {
          this.error = 'Invalid test cases format received from server.';
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Unable to load test cases. Try again later.';
        this.isLoading = false;
        console.error('Error fetching test cases:', err);
      },
    });
  }

  convertToJson(input: string): string {
    try {
      // Try parsing as JSON directly
      return JSON.stringify(JSON.parse(input));
    } catch {
      // If input contains a comma-separated format, wrap it into an array
      const sanitizedInput = `[${input}]`.replace(/,\s*$/, ''); // Ensure trailing commas are removed
      try {
        return JSON.stringify(JSON.parse(sanitizedInput));
      } catch (error) {
        console.error('Failed to convert input to JSON:', input, error);
        return JSON.stringify([]); // Default to an empty array if parsing fails
      }
    }
  }
  

  runCode(): void {
    const languageIdMap: { [key: string]: number } = {
      python: 71,
      javascript: 63,
      cpp: 53,
      java: 62,
    };

    const languageId = languageIdMap[this.selectedLanguage];
    this.codeOutput = 'Running code...\n';

    if (this.testCases.length === 0) {
      this.codeOutput = 'No test cases available.';
      return;
    }

    this.testCases.forEach((testCase, index) => {
      let inputData;
      try {
        inputData = JSON.parse(testCase.input); // Parse input safely
      } catch (error) {
        console.error(`Failed to parse input for test case ${index + 1}:`, testCase.input);
        testCase.status = 'failed';
        this.codeOutput += `Test Case ${index + 1}: Failed due to invalid input format\n\n`;
        return;
      }

      this.problemService.runCode(this.codeInput, languageId, inputData).subscribe({
        next: (data) => {
          console.log(`Test Case ${index + 1} API Response:`, data);

          if (data.stderr) {
            testCase.status = 'failed';
            this.codeOutput += `Test Case ${index + 1}: Failed\nOutput: ${data.stdout}\nErrors: ${data.stderr}\nExecution Time: ${data.time}s\nMemory Used: ${data.memory}KB\n\n`;
          } else if (data.stdout === testCase.output) {
            testCase.status = 'passed';
            this.codeOutput += `Test Case ${index + 1}: Passed\nOutput: ${data.stdout}\nExecution Time: ${data.time}s\nMemory Used: ${data.memory}KB\n\n`;
          } else {
            testCase.status = 'failed';
            this.codeOutput += `Test Case ${index + 1}: Failed\nExpected Output: ${testCase.output}\nYour Output: ${data.stdout}\nErrors: ${data.stderr}\nExecution Time: ${data.time}s\nMemory Used: ${data.memory}KB\n\n`;
          }
        },
        error: (err) => {
          console.error('Error running code for test case:', index, err);
          testCase.status = 'failed';
          this.codeOutput += `Test Case ${index + 1}: Error\nError Message: ${err.message}\n\n`;
        },
      });
    });
  }

  saveCode(): void {
    if (this.problemId) {
      localStorage.setItem(`problem-${this.problemId}`, this.codeInput);
    }
  }

  loadSavedCode(): void {
    if (this.problemId) {
      const savedCode = localStorage.getItem(`problem-${this.problemId}`);
      if (savedCode) {
        this.codeInput = savedCode;
      }
    }
  }

  switchTab(tabId: string): void {
    this.activeTab = tabId;
  }
}
