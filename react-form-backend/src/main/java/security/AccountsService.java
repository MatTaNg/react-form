package security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.StringUtils;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.reactform.backend.reactformbackend.Account;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;

@Service
public class AccountsService {
    private AmazonS3 s3client;

    @Value("${amazonProperties.endpointUrl}")
    private String endpointUrl;
    @Value("${amazonProperties.bucketName}")
    private String bucketName;
    @Value("${amazonProperties.accessKey}")
    private String accessKey;
    @Value("${amazonProperties.secretKey}")
    private String secretKey;
    
    private final String FILE_NAME = "accounts.txt"; 
    
	@PostConstruct
    private void initializeAmazon() {
       AWSCredentials credentials = new BasicAWSCredentials(this.accessKey, this.secretKey);
       this.s3client = new AmazonS3Client(credentials);
	}
	
  public List<Account> getAccounts() {
	    return getAllAccounts().values().stream().collect(Collectors.toList());
  }
  
  public boolean addAccount(Account account) {
	    Map<String, Account> accounts = getAllAccounts();
	    if(accounts.containsKey(account.getUserName())) {
	    	return false;
	    } 
    	String jsonAccounts;
	    accounts.put(account.getUserName(), account);
		try {
			jsonAccounts = new ObjectMapper().writeValueAsString(accounts);
			s3client.putObject(bucketName, "accounts.txt", jsonAccounts);
		} catch (JsonProcessingException e1) {
			e1.printStackTrace();
		}
		return true;
  }
  
  public Account editUserName(Account account, String userName) {
//	  if(accounts.containsKey(account.getUserName())) {
//		  return accounts.put(userName, account);
//	  }
	  return null;
  }
  public Account deleteAccount(String userName) {
	  return null;
//	  return accounts.remove(userName);
  }
  
  public Account getByUsername(String userName) {
	    Map<String, Account> accounts = getAllAccounts();
	    System.out.println(accounts.get(userName));
	    return accounts.get(userName);
  }

	private Map<String, Account> getAllAccounts() {
	  S3Object s3object = s3client.getObject(bucketName, FILE_NAME);
	  S3ObjectInputStream inputStream = s3object.getObjectContent();
	  try {
		String str = getAsString(inputStream);
	    return new ObjectMapper().readValue(str, Map.class);
	  } catch (IOException e) {
		e.printStackTrace();
	  }
	  return null;
	}
	
  private static String getAsString(S3ObjectInputStream is) throws IOException {
	    if (is == null)
	        return "";
	    StringBuilder sb = new StringBuilder();
	    try {
	        BufferedReader reader = new BufferedReader(
	                new InputStreamReader(is, StringUtils.UTF8));
	        String line;
	        while ((line = reader.readLine()) != null) {
	            sb.append(line);
	        }
	    } finally {
	        is.close();
	    }
	    return sb.toString();
	}
  
}