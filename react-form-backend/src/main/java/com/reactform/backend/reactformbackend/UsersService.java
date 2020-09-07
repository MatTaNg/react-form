package src.main.java.com.reactform.backend.reactformbackend;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UsersService {
	
	private static List<User> users = new ArrayList<>();

	  public List<User> getUsers() {
	    return users;
	  }
	  public List<User> addUser(User user) {
	  	if(isUserExist(user)) {
	  		return null;
		}
		users.add(user);
		return users;
	  }
	  public List<User> editUserName(User user, String userName) {
	  	for(int i = 0; i < users.size(); i++) {
	  		if(users.get(i).getUserName().equals(userName)) {
	  			users.set(i, user);
			}
		}
	    return users;
	  }
	  public List<User> deleteUser(String userName) {
		users.removeIf(user -> user.getUserName().equals(userName));
	    return users;
	  }
	  public boolean findUser(String userName) {
	  	for(User user : users) {
	  		if(user.getUserName().equals(userName)) {
	  			return true;
			}
		}
	  	return false;
	  }

	  private boolean isUserExist(User user) {
		  for(User u : users) {
			  if(u.getUserName().equals(user.getUserName())) {
				  return true;
			  }
		  }
		  return false;
	  }
}
