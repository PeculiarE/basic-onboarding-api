CREATE OR REPLACE FUNCTION convert_email_case() RETURNS trigger AS $$
BEGIN
  NEW.email := LOWER(NEW.email);
  RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER convert_email_case_trigger
BEFORE INSERT OR UPDATE ON "user_info"
FOR EACH ROW EXECUTE PROCEDURE convert_email_case();
