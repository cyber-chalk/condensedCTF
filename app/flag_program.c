#include <stdio.h>

int main() {
	char input[] = "Good Job! you solved the cipher. Here's the flag: [condencedCTF(SOLVED)]";
	int inputLen = 0;
	
	while(input[inputLen] != '\0') {
		inputLen++;
	}
	
	for(int i = 0; i < inputLen; i++) {
		if(i % 2 == 0) {
			if(input[i] + i <= 126) {
				input[i] += i;
			} else {
				input[i] = (input[i] + i - 126) + 32;
			}
		} else {
			if(input[i] - i >= 33) {
				input[i] -= i;
			} else {
				input[i] = (input[i] - i + 126) - 33;
			}
		}
	}
	
	printf("%s\n", input);
	return 0;
}
