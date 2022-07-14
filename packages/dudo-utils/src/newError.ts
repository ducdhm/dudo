class HttpError extends Error {
    code: number | string;
}

export default function newError(code: number | string = 500, message: string = 'Internal Server Error'): HttpError {
    let error = new HttpError(message);
    error.code = code;
    
    return error;
};
