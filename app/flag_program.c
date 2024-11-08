#include <stdio.h>

int main() {
	char input[] = "Good_Job_you_solved_the_cipher._Here's_the_flag:_[condencedCTF(SOLVED)]";
	int inputLen = 0;
	
	while(input[inputLen] != '\0') {
		inputLen++;
	}
	
	for(int i = 1; i <= inputLen; i++) {
		if(i % 2 == 0) {
			if(input[i-1] + i < 126) {
				input[i-1] += i;
			} else {
				input[i-1] = (input[i-1] + i - 126) + 33;
			}
		} else {
			if(input[i-1] - i > 33) {
				input[i-1] -= i;
			} else {
				input[i-1] = (input[i-1] - i + 126) - 33;
			}
		}
	}
	
	printf("%s\n", input);
	return 0;
}
