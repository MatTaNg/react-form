package security;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.reactform.backend.reactformbackend.Account;


@SpringBootApplication
public class ApplicationEntryPoint {

	public static void main(String[] args) {
		SpringApplication.run(ApplicationEntryPoint.class, args);
	}

}


@CrossOrigin(origins = "http://localhost:3000")
@RestController
class HelloWorldController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtUtil jwtTokenUtil;

	@Autowired
	private MyUserDetailsService userDetailsService;
	
	@Autowired
	private AccountsService usersService;
	  
	  @Autowired
	  private AccountsService accountsService;
	  
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {

		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
			);
		}
		catch (BadCredentialsException e) {
			throw new Exception("Incorrect username or password", e);
		}


		final UserDetails userDetails = userDetailsService
				.loadUserByUsername(authenticationRequest.getUsername());

		final String jwt = jwtTokenUtil.generateToken(userDetails);

		return ResponseEntity.ok(new AuthenticationResponse(jwt));
	}
	
	//? The below should ideally be moved to another class in the main package, but if its moved to a different package it doesn't work.
  @ResponseBody
  @PostMapping("accounts")
  public boolean addUser(@RequestBody Account account) {
    return usersService.addAccount(account);
  }
  
  //? For some reason, getting "Request method 'GET' not supported in Spring Boot Controller"
  @ResponseBody
  @GetMapping("/accounts")
  public List<Account> getUsers() {
    return accountsService.getAccounts();
  }

  @ResponseBody
  @PutMapping("accounts/{userName}")
  public Account editUserName(@PathVariable  String userName, @RequestBody Account account) {
    return accountsService.editUserName(account, userName);
  }
  
  //? This doesn't work yet, it keeps returning a 400 for some reason.
  @ResponseBody
  @DeleteMapping("/accounts")
  public boolean deleteAccount(@RequestBody  String userName) {
	  System.out.println(userName);
	  return true;
//    return accountsService.deleteAccount(userName);
  }

}

@EnableWebSecurity
class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	@Autowired
	private UserDetailsService myUserDetailsService;
	@Autowired
	private JwtRequestFilter jwtRequestFilter;

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(myUserDetailsService);
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return NoOpPasswordEncoder.getInstance(); //Make sure spring doesn't encode the password bcuz we use it to authenticate
	}

	@Override
	@Bean
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean(); //We have to make our own AuthenticationManager bean so we can autowire it
	}

	@Override
	protected void configure(HttpSecurity httpSecurity) throws Exception {
		httpSecurity.csrf().disable()
				.authorizeRequests().antMatchers("/login", "/accounts").permitAll(). //Spring secures all endpoints by default. Tell it to permit these
						anyRequest().authenticated().and().exceptionHandling().and().sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS); //Tell Spring not to create/manage its own state. Use ours instead (next line)
		httpSecurity.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class); //Add our filter in before UsernamePasswordAuthenticationFilter gets used

	}

}