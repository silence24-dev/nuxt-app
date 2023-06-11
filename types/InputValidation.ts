type InputValidation = {
	key: string;
	isBlank: boolean;
	lenghtMin5: boolean;
	hasError: boolean;
	value: string;
	emailTaken?: boolean;
	nameTaken?: boolean;
	errorMessage?: string;
};
