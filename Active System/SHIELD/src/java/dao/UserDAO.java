/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import db.DBConnector;
import entity.Area;
import entity.LogEntry;
import entity.Mission;
import entity.User;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Franco
 */
public class UserDAO {

    public User Login(String username, String password) { //Checks for login success; Returns null for failures and User object for successes
        try {
            //Create Connection
            DBConnector db = new DBConnector();
            Connection cn = db.getConnection();

            //Prepare the statement which will use a stored procedure
            PreparedStatement pstmt = cn.prepareStatement("CALL `shield`.`login`(?, ?);");
            pstmt.setString(1, username);
            pstmt.setString(2, password);

            //Run statement and advance to first line
            ResultSet rs = pstmt.executeQuery();
            rs.next();

            User user = null; //Create return variable

            if (rs.getRow() != 0) {
                int success = rs.getInt(1);
                if (success == 1) {
                    int id = rs.getInt(2);
                    int classID = rs.getInt(3);
                    String uname = rs.getString(4);
                    String nameTitle = rs.getString(5);
                    String nameFirst = rs.getString(6);
                    String nameOther = rs.getString(7);
                    String nameLast = rs.getString(8);
                    user = new User(id, classID, uname, nameTitle, nameFirst, nameOther, nameLast);
                    user.generateFullName();
                }
            }

            //Close connection
            cn.close();
            return user;

        } catch (SQLException ex) {
            Logger.getLogger(UserDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    public boolean Logout(int id) {
        try {
            //Create Connection
            DBConnector db = new DBConnector();
            Connection cn = db.getConnection();

            //Prepare the statement which will use a stored procedure
            PreparedStatement pstmt = cn.prepareStatement("CALL `shield`.`logout`(?);");
            pstmt.setInt(1, id);
            //Run statement and advance to first line
            ResultSet rs = pstmt.executeQuery();
            rs.next();

            boolean success = false;
            if (rs.getRow() != 0) {
                int result = rs.getInt(1);
                if (result == 1) {
                    success = true;
                }
            }

            //Close connection
            cn.close();
            return success;

        } catch (SQLException ex) {
            Logger.getLogger(UserDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return false;
    }

    public String GetFullName(int id) {
        try {
            //Create Connection
            DBConnector db = new DBConnector();
            Connection cn = db.getConnection();

            //Prepare the statement which will use a stored procedure
            PreparedStatement pstmt = cn.prepareStatement("CALL `shield`.`get_user_full_name`(?)");
            pstmt.setInt(1, id);

            //Run statement and advance to first line
            ResultSet rs = pstmt.executeQuery();
            rs.next();

            String fullName = null;

            if (rs.getRow() != 0) {
                String title = rs.getString(1);
                String first = rs.getString(2);
                String other = rs.getString(3);
                String last = rs.getString(4);

                fullName = (title == null ? "" : title + ". ") + (first == null ? "" : first + " ") + (other == null ? "" : other + " ") + (last == null ? "" : last + " ");
            }
            cn.close();
            return fullName;

        } catch (SQLException ex) {
            Logger.getLogger(UserDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    public ArrayList<User> GetAllUser() {
        try {
            DBConnector db = new DBConnector();
            Connection cn = db.getConnection();

            PreparedStatement pstmt = cn.prepareStatement("CALL `shield`.`get_all_user`();");
            ResultSet rs = pstmt.executeQuery();
            rs.next();
            if (rs.getRow() == 0) {
                cn.close();
                return null;
            } else {
                ArrayList<User> userList = new ArrayList<User>();
                do {
                    User user = new User();
                    user.setId(rs.getInt(1));
                    user.setClassID(rs.getInt(2));
                    user.setClassDesc(rs.getString(3));
                    if (rs.getInt(4) == 1) {
                        user.setStatus("Logged In");
                    } else {
                        user.setStatus("Logged Out");
                    }
                    user.setLastSeen(rs.getDate(5));
                    user.setUname(rs.getString(6));
                    user.setNameTitle(rs.getString(7));
                    user.setNameFirst(rs.getString(8));
                    user.setNameOther(rs.getString(9));
                    user.setNameLast(rs.getString(10));
                    user.generateFullName();
                    userList.add(user);
                } while (rs.next());

                cn.close();
                return userList;
            }

        } catch (SQLException ex) {
            Logger.getLogger(MissionDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return null;
    }

    public ArrayList<LogEntry> GetAccessLog() {
        try {
            DBConnector db = new DBConnector();
            Connection cn = db.getConnection();

            PreparedStatement pstmt = cn.prepareStatement("CALL `shield`.`get_all_access`();");
            ResultSet rs = pstmt.executeQuery();
            rs.next();
            if (rs.getRow() == 0) {
                cn.close();
                return null;
            } else {
                ArrayList<LogEntry> logList = new ArrayList<LogEntry>();
                do {
                    LogEntry log = new LogEntry();
                    log.setId(rs.getInt(1));
                    log.setUserID(rs.getInt(2));
                    log.setUserUname(rs.getString(3));
                    log.setDate(rs.getDate(4));
                    log.setEntryClassId(rs.getInt(5));
                    log.setEntryClassDesc(rs.getString(6));
                    logList.add(log);
                } while (rs.next());

                cn.close();
                return logList;
            }

        } catch (SQLException ex) {
            Logger.getLogger(MissionDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return null;
    }

    public ArrayList<LogEntry> GetActionLog() {
        try {
            DBConnector db = new DBConnector();
            Connection cn = db.getConnection();

            PreparedStatement pstmt = cn.prepareStatement("CALL `shield`.`get_all_action`();");
            ResultSet rs = pstmt.executeQuery();
            rs.next();
            if (rs.getRow() == 0) {
                cn.close();
                return null;
            } else {
                ArrayList<LogEntry> logList = new ArrayList<LogEntry>();
                do {
                    LogEntry log = new LogEntry();
                    log.setId(rs.getInt(1));
                    log.setUserID(rs.getInt(2));
                    log.setUserUname(rs.getString(3));
                    log.setDate(rs.getDate(4));
                    log.setEntryDesc(rs.getString(5));
                    logList.add(log);
                } while (rs.next());

                cn.close();
                return logList;
            }

        } catch (SQLException ex) {
            Logger.getLogger(MissionDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return null;
    }

    public int AddUser(int editorID, User user) {
        try {
            DBConnector db = new DBConnector();
            Connection cn = db.getConnection();

            PreparedStatement pstmt = cn.prepareStatement("CALL `shield`.`add_user`(?, ?, ?, ?, ?, ?, ?, ?);");
            pstmt.setInt(1, editorID);
            pstmt.setInt(2, user.getClassID());
            pstmt.setString(3, user.getUname());
            pstmt.setString(4, user.getPword());
            pstmt.setString(5, user.getNameTitle());
            pstmt.setString(6, user.getNameFirst());
            pstmt.setString(7, user.getNameOther());
            pstmt.setString(8, user.getNameLast());
            

            ResultSet rs = pstmt.executeQuery();
            rs.next();

            if (rs.getRow() == 0) {
                cn.close();
                return -1;
            } else {
                return rs.getInt(1);
            }
        } catch (SQLException ex) {
            Logger.getLogger(MissionDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return -1;
    } //Clear

    public User GetUser(int userID){
        try {
            DBConnector db = new DBConnector();
            Connection cn = db.getConnection();

            PreparedStatement pstmt = cn.prepareStatement("CALL `shield`.`get_user`(?);");
            pstmt.setInt(1, userID);
            ResultSet rs = pstmt.executeQuery();
            rs.next();

            if (rs.getRow() == 0) {
                cn.close();
                return null;
            } else {
                User user = new User();
                
                user.setId(userID);
                user.setClassID(rs.getInt(2));
                user.setUname(rs.getString(3));
                user.setNameTitle(rs.getString(4));
                user.setNameFirst(rs.getString(5));
                user.setNameOther(rs.getString(6));
                user.setNameLast(rs.getString(7));

                cn.close();
                return user;
            }
        } catch (SQLException ex) {
            Logger.getLogger(MissionDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }
    
    public int UpdateUser(User user, String oldPassword) {
        try {
            DBConnector db = new DBConnector();
            Connection cn = db.getConnection();

            PreparedStatement pstmt = cn.prepareStatement("CALL `shield`.`update_user`(?, ?, ?, ?, ?, ?, ?, ?);");
            pstmt.setInt(1, user.getId());
            pstmt.setString(2, user.getUname());
            pstmt.setString(3, oldPassword);
            pstmt.setString(4, user.getPword());
            pstmt.setString(5, user.getNameTitle());
            pstmt.setString(6, user.getNameFirst());
            pstmt.setString(7, user.getNameOther());
            pstmt.setString(8, user.getNameLast());
            

            ResultSet rs = pstmt.executeQuery();
            rs.next();

            if (rs.getRow() == 0) {
                cn.close();
                return -1;
            } else {
                return rs.getInt(1);
            }
        } catch (SQLException ex) {
            Logger.getLogger(MissionDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return -1;
    } //Clear
}
