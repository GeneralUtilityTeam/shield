/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import db.DBConnector;
import entity.Mission;
import entity.Task;
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
public class MissionDAO {
    
    public Mission GetMission(int missionID) {
        try {
            DBConnector db = new DBConnector();
            Connection cn = db.getConnection();
            
            PreparedStatement pstmt = cn.prepareStatement("CALL `shield`.`8309`(?);");
            pstmt.setInt(1, missionID);
            ResultSet rs = pstmt.executeQuery();
            rs.next();
            
            if (rs.getRow() == 0) {
                cn.close();
                return null;
            } else {
                Mission mson = new Mission();
                
                mson.setId(missionID);
                mson.setTitle(rs.getString(1));
                mson.setObjective(rs.getString(2));
                mson.setSituation(rs.getString(3));
                mson.setCommanderIntent(rs.getString(4));
                mson.setConceptOfOperation(rs.getString(5));
                mson.setThemeStress(rs.getString(6));
                mson.setThemeAvoid(rs.getString(7));
                mson.setUserID(rs.getInt(8));
                mson.setLocality(rs.getString(9));
                mson.setAdministrativeAreaLevel2(rs.getString(10));
                mson.setAdministrativeAreaLevel1(rs.getString(11));
                mson.setCountry(rs.getString(12));
                mson.generateFullAddress();
                
                pstmt = cn.prepareStatement("CALL `shield`.`6840`(?);");
                pstmt.setInt(1, missionID);
                rs = pstmt.executeQuery();
                rs.next();
                if (rs.getRow() != 0) {
                    ArrayList<Task> taskList = new ArrayList<Task>();
                    do {
                        taskList.add(new Task(rs.getInt(1), rs.getString(2), rs.getString(3)));
                    } while (rs.next());
                    
                    mson.setTaskList(taskList);
                }
                
                cn.close();
                return mson;
            }
        } catch (SQLException ex) {
            Logger.getLogger(MissionDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }
    public int GetMissionStatus(int missionID) {
        try {
            DBConnector db = new DBConnector();
            Connection cn = db.getConnection();
            
            PreparedStatement pstmt = cn.prepareStatement("CALL `shield`.`9577`(?);");
            pstmt.setInt(1, missionID);
            ResultSet rs = pstmt.executeQuery();
            rs.next();
            if (rs.getRow() == 0) {
                cn.close();
                return 0;
            } else {
                cn.close();
                
                return rs.getInt(1);
            }
        } catch (SQLException ex) {
            Logger.getLogger(MissionDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return 0;
    }
    public ArrayList<Mission> GetAllMissions() {
        try {
            DBConnector db = new DBConnector();
            Connection cn = db.getConnection();
            
            PreparedStatement pstmt = cn.prepareStatement("CALL `shield`.`3072`();");
            ResultSet rs = pstmt.executeQuery();
            rs.next();
            if (rs.getRow() == 0) {
                cn.close();
                return null;
            } else {
                ArrayList<Mission> msonList = new ArrayList<Mission>();
                do {
                    Mission mson = new Mission();
                    mson.setId(rs.getInt(1));
                    mson.setStatus(rs.getInt(2));
                    mson.setTitle(rs.getString(3));
                    mson.setObjective(rs.getString(4));
                    mson.setStartDT(rs.getDate(5));
                    mson.setEndDT(rs.getDate(6));
                    mson.setSublocality(rs.getString(7));
                    mson.setLocality(rs.getString(8));
                    mson.setAdministrativeAreaLevel2(rs.getString(9));
                    mson.setAdministrativeAreaLevel1(rs.getString(10));
                    mson.setCountry(rs.getString(11));
                    mson.generateFullAddress();
                    
                    msonList.add(mson);
                } while (rs.next());
                
                cn.close();
                return msonList;
            }
            
        } catch (SQLException ex) {
            Logger.getLogger(MissionDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        return null;
    }
    public ArrayList<Mission> GetAllOngoingMissionOfUser(int userID) {
        try {
            DBConnector db = new DBConnector();
            Connection cn = db.getConnection();
            
            PreparedStatement pstmt = cn.prepareStatement("CALL `shield`.`1698`(?);");
            pstmt.setInt(1, userID);
            ResultSet rs = pstmt.executeQuery();
            rs.next();
            if (rs.getRow() == 0) {
                cn.close();
                return null;
            } else {
                ArrayList<Mission> msonList = new ArrayList<Mission>();
                do {
                    Mission mson = new Mission();
                    mson.setId(rs.getInt(1));
                    mson.setStatus(rs.getInt(2));
                    mson.setTitle(rs.getString(3));
                    mson.setObjective(rs.getString(4));
                    mson.setStartDT(rs.getDate(5));
                    mson.setEndDT(rs.getDate(6));
                    mson.setSublocality(rs.getString(7));
                    mson.setLocality(rs.getString(8));
                    mson.setAdministrativeAreaLevel2(rs.getString(9));
                    mson.setAdministrativeAreaLevel1(rs.getString(10));
                    mson.setCountry(rs.getString(11));
                    mson.generateFullAddress();
                    
                    msonList.add(mson);
                } while (rs.next());
                
                cn.close();
                return msonList;
            }
            
        } catch (SQLException ex) {
            Logger.getLogger(MissionDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        return null;
    }
    public int AddMission(Mission mson){
        try {
            DBConnector db = new DBConnector();
            Connection cn = db.getConnection();
            
            PreparedStatement pstmt = cn.prepareStatement("CALL `shield`.`2428`(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);");
            pstmt.setInt(1, mson.getUserID());
            pstmt.setString(2, mson.getTitle());
            pstmt.setString(3, mson.getObjective());
            pstmt.setString(4, mson.getSublocality());
            pstmt.setString(5, mson.getLocality());
            pstmt.setString(6, mson.getAdministrativeAreaLevel2());
            pstmt.setString(7, mson.getAdministrativeAreaLevel1());
            pstmt.setString(8, mson.getCountry());
            pstmt.setDouble(9, mson.getLat());
            pstmt.setDouble(10, mson.getLng());
            
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
    }
}
