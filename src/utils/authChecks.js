export const checkHeadersAuthentification = (req) => {
  return (
    req.headers.authorization && req.headers.authorization.startsWith('Bearer')
  );
};
