package com.reactform.backend.reactformbackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@Configuration
public class UsersResource {

  @Autowired
  private UsersService usersService;

  @ResponseBody
  @GetMapping("users/{userName}")
  public boolean findUser(@PathVariable String userName) {
    return usersService.findUser(userName);
  }

  @ResponseBody
  @GetMapping("users")
  public List<User> getUsers() {
    return usersService.getUsers();
  }

  @ResponseBody
  @PostMapping("users")
  public List<User> addUser(@RequestBody User user) {
    return usersService.addUser(user);
  }

  @ResponseBody
  @PutMapping("users/{userName}")
  public List<User> editUsername(@PathVariable  String userName, @RequestBody User user) {
    return usersService.editUserName(user, userName);
  }

  @DeleteMapping("users/{userName}")
  public List<User> deleteUser(@PathVariable  String userName) {
    return usersService.deleteUser(userName);
  }
}