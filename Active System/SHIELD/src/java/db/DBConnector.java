package db;

import java.sql.*;
import java.util.logging.Level;
import java.util.logging.Logger;

public class DBConnector {
	private String driverName = "com.mysql.jdbc.Driver"; 
	private String url = "jdbc:mysql://localhost:3306/shield"; 
	private String username = "shield"; 
	private String password = "w44m4wzi";
	
	public Connection getConnection(){
		 try {
		        
	        Class.forName(getDriverName());
	        Connection conn = DriverManager.getConnection(getUrl(),getUsername(),getPassword() );
	    
	        return conn;
	           
	        } catch (SQLException ex) {
	            Logger.getLogger(DBConnector.class.getName()).log(Level.SEVERE, null, ex);
	        } catch (ClassNotFoundException ex) {
	            Logger.getLogger(DBConnector.class.getName()).log(Level.SEVERE, null, ex);
	        }
	        return null;
	}
	
	public String getDriverName() {
        return driverName;
	}
	public String getUrl() {
        return url;
	}
	public String getUsername() {
        return username;
	}
	public String getPassword() {
        return password;
	}
}
