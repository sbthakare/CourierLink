package CourierServices.exception;

public class UserAlredyExistException extends RuntimeException {

	public UserAlredyExistException(String msg) {
		super(msg);
	}
}
