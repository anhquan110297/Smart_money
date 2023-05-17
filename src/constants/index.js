export const PUBLIC_LAYOUT = 'default';
export const EMAIL_REGEX = new RegExp(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/);

export const PASSWORD_REGEX = new RegExp(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[~!@#$%^&*()\-_=+\/*\[\]{}\\|:;"',./<>?])(?!.*\s).{6,}$/
);
export const USERNAME_REGEX = new RegExp(/^(?!.*\s\s)[A-Za-z\s]{5,16}$/);
