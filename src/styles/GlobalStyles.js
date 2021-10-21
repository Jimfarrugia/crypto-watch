import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
	body {
		background: ${({ theme }) => theme.color.background};
		color: ${({ theme }) => theme.color.text.main};
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
		background-color: ${({ theme }) => theme.color.background};
	}
	::-webkit-scrollbar-corner {
		background-color: ${({ theme }) => theme.color.background};
	}
	::-webkit-scrollbar-thumb {
		background-color: ${({ theme }) => theme.color.main.dark};
		outline: none;
		border-radius: 3px;
	}

	::placeholder {
		/* Chrome, Firefox, Opera, Safari 10.1+ */
		color: ${({ theme }) => theme.color.main.dark};
		opacity: 1; /* Firefox */
	}
	:-ms-input-placeholder {
		/* Internet Explorer 10-11 */
		color: ${({ theme }) => theme.color.main.dark};
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
			color:${({ theme }) => theme.color.text.link};
			text-decoration: none;
			transition: 0.125s;
		}
		&:hover,
		&:active {
			color: ${({ theme }) => theme.color.text.hover};
		}
		&:focus {
			outline: 0.125rem solid ${({ theme }) => theme.color.text.hover};
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
				color: ${({ theme }) => theme.color.main.light};
				width: 100%;
				background: none;
				border: 1px solid ${({ theme }) => theme.color.main.dark};
				border-radius: 0.25em;
				padding: 0.75em;
				font-size: 1rem;
				outline: none;
				transition: 0.25s;
				&::placeholder {
					color: ${({ theme }) => theme.color.main.dark};
				}
				&:hover,
				&:focus {
					border-color: ${({ theme }) => theme.color.main.light};
				}
				&:focus {
					box-shadow: 0 0 0.25em ${({ theme }) => theme.color.main.light};
				}
				&:autofill {
					background-color: none !important;
					color: ${({ theme }) => theme.color.main.light};
				}
				&:-webkit-autofill,
				&:-webkit-autofill:hover,
				&:-webkit-autofill:focus,
				&:-internal-autofill-selected {
					background-color: none !important;
					color:${({ theme }) => theme.color.main.light} !important;
					box-shadow: 0 0 0px 1000px ${({ theme }) =>
            theme.color.background} inset; /* chrome */
					-webkit-text-fill-color:${({ theme }) => theme.color.main.light}; /* chrome */
				}
			}
	}
`;

export default GlobalStyles;
