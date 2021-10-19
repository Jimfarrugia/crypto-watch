import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
	@import url("https://fonts.googleapis.com/css2?family=Ubuntu+Mono&family=Ubuntu:wght@400;700&display=swap");

	body {
		background: ${({ theme }) => theme.colors.black};
		color: ${({ theme }) => theme.colors.white};
		min-width: 100%;
		min-height: 100vh;
		margin: 0;
		padding: 0;
		font-family: "Ubuntu", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell",
			"Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	::-webkit-scrollbar {
		width: 0.5em;
		height: 0.5em;
		background-color: ${({ theme }) => theme.colors.black};
	}
	::-webkit-scrollbar-corner {
		background-color: var(--black);
	}
	::-webkit-scrollbar-thumb {
		background-color: var(--purple);
		outline: none;
		border-radius: 3px;
	}

	::placeholder {
		/* Chrome, Firefox, Opera, Safari 10.1+ */
		color: var(--purple);
		opacity: 1; /* Firefox */
	}
	:-ms-input-placeholder {
		/* Internet Explorer 10-11 */
		color: var(--white);
	}

	h1 {
		margin: 0;
		text-align: left;
		padding: 0.75em 0;
		font-size: 1.25rem;
		text-shadow: 1px 1px 4px #00000088;
	}

	h2 {
		margin-bottom: 1.125em;
	}

	a {
		&:link,
		&:visited {
			color:${({ theme }) => theme.colors.purpleBright};
			text-decoration: none;
			transition: 0.125s;
		}
		&:hover,
		&:active {
			color: ${({ theme }) => theme.colors.purple};
		}
		&:focus {
			outline: 0.125rem solid ${({ theme }) => theme.colors.purple};
		}
	}


	label {
		visibility: hidden;
		display: block;
		height: 0;
	}

	input {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		box-sizing: border-box;
			&[type="email"],
			&[type="password"] {
				color: ${({ theme }) => theme.colors.purpleBright};
				width: 100%;
				background: none;
				border: 1px solid ${({ theme }) => theme.colors.purple};
				border-radius: 0.25em;
				padding: 0.75em;
				font-size: 1rem;
				outline: none;
				transition: 0.25s;
				&::placeholder {
					color: ${({ theme }) => theme.colors.purpleBright};
				}
				&:hover,
				&:focus {
					border-color: ${({ theme }) => theme.colors.purpleBright};
				}
				&:focus {
					box-shadow: 0 0 0.25em ${({ theme }) => theme.colors.purple};
				}
				&:autofill {
					background-color: none !important;
					color: ${({ theme }) => theme.colors.purpleBright};
				}
				&:-webkit-autofill,
				&:-webkit-autofill:hover,
				&:-webkit-autofill:focus,
				&:-internal-autofill-selected {
					background-color: none !important;
					color:${({ theme }) => theme.colors.purpleBright} !important;
					box-shadow: 0 0 0px 1000px ${({ theme }) =>
            theme.colors.black} inset; /* chrome */
					-webkit-text-fill-color:${({ theme }) =>
            theme.colors.purpleBright}; /* chrome */
				}
			}
	}
`;

export default GlobalStyles;
