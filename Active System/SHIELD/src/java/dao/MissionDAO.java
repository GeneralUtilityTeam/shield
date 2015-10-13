/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import db.DBConnector;
import entity.Area;
import entity.Mission;
import entity.Task;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import utility.ShieldUtility;

/**
 *
 * @author Franco
 */
public class MissionDAO {
    
    ShieldUtility su = new ShieldUtility();

    //Mission
    
    public Mission GetMission(int missionID) {
        try {
            DBConnector db = new DBConnector();
            Connection cn = db.getConnection();

            PreparedStatement pstmt = cn.prepareStatement("CALL `shield`.`get_mission`(?);");
            pstmt.setInt(1, missionID);
            ResultSet rs = pstmt.executeQuery();
            rs.next();

            if (rs.getRow() == 0) {
                cn.close();
                return null;
            } else {
                Mission mson = new Mission();
                Area area = new Area();

                mson.setId(missionID);
                mson.setTitle(rs.getString(1));
                mson.setObjective(rs.getString(2));
                mson.setSituation(rs.getString(3));
                mson.setCommanderIntent(rs.getString(4));
                mson.setConceptOfOperation(rs.getString(5));
                mson.setThemeStress(rs.getString(6));
                mson.setThemeAvoid(rs.getString(7));
                mson.setUserID(rs.getInt(8));
                area.setLevel8(rs.getString(9));
                area.setLevel7(rs.getString(10));
                area.setLevel6(rs.getString(11));
                area.setLevel5(rs.getString(12));
                area.setLevel4(rs.getString(13));
                area.setLevel3(rs.getString(14));
                area.setLevel2(rs.getString(15));
                area.setLevel1(rs.getString(16));
                area.setLat(rs.getDouble(17));
                area.setLng(rs.getDouble(18));
                mson.setArea(area);

                pstmt = cn.prepareStatement("CALL `shield`.`get_all_task_mission`(?);");
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

            PreparedStatement pstmt = cn.prepareStatement("CALL `shield`.`get_mission_status`(?);");
            pstmt.setInt(1, missionID);
            ResultSet rs = pstmt.executeQuery();
            rs.next();
            if (rs.getRow() == 0) {
                cn.close();
                return 0;
            } else {
                int missionStatus = rs.getInt(1);
                cn.close();

                return missionStatus;
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

            PreparedStatement pstmt = cn.prepareStatement("CALL `shield`.`get_all_mission`();");
            ResultSet rs = pstmt.executeQuery();
            rs.next();
            if (rs.getRow() == 0) {
                cn.close();
                return null;
            } else {
                ArrayList<Mission> msonList = new ArrayList<Mission>();
                do {
                    Mission mson = new Mission();
                    Area area = new Area();

                    mson.setId(rs.getInt(1));
                    mson.setStatus(rs.getInt(2));
                    mson.setTitle(rs.getString(3));
                    mson.setObjective(rs.getString(4));
                    mson.setStartDT(rs.getDate(5));
                    mson.setEndDT(rs.getDate(6));
                    area.setLevel8(rs.getString(7));
                    area.setLevel7(rs.getString(8));
                    area.setLevel6(rs.getString(9));
                    area.setLevel5(rs.getString(10));
                    area.setLevel4(rs.getString(11));
                    area.setLevel3(rs.getString(12));
                    area.setLevel2(rs.getString(13));
                    area.setLevel1(rs.getString(14));
                    mson.setArea(area);;

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

            PreparedStatement pstmt = cn.prepareStatement("CALL `shield`.`get_all_mission_ongoing_user`(?);");
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
                    Area area = new Area();

                    mson.setId(rs.getInt(1));
                    mson.setStatus(rs.getInt(2));
                    mson.setTitle(rs.getString(3));
                    mson.setObjective(rs.getString(4));
                    mson.setStartDT(rs.getDate(5));
                    mson.setEndDT(rs.getDate(6));
                    area.setLevel8(rs.getString(7));
                    area.setLevel7(rs.getString(8));
                    area.setLevel6(rs.getString(9));
                    area.setLevel5(rs.getString(10));
                    area.setLevel4(rs.getString(11));
                    area.setLevel3(rs.getString(12));
                    area.setLevel2(rs.getString(13));
                    area.setLevel1(rs.getString(14));
                    mson.setArea(area);;

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

    public int AddMission(Mission mson) {
        try {
            DBConnector db = new DBConnector();
            Connection cn = db.getConnection();

            Area area = mson.getArea();

            PreparedStatement pstmt = cn.prepareStatement("CALL `shield`.`add_mission`(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);");
            pstmt.setInt(1, mson.getUserID());
            pstmt.setString(2, mson.getTitle());
            pstmt.setString(3, mson.getObjective());
            pstmt.setString(4, area.getLevel8());
            pstmt.setString(5, area.getLevel7());
            pstmt.setString(6, area.getLevel6());
            pstmt.setString(7, area.getLevel5());
            pstmt.setString(8, area.getLevel4());
            pstmt.setString(9, area.getLevel3());
            pstmt.setString(10, area.getLevel2());
            pstmt.setString(11, area.getLevel1());
            pstmt.setDouble(12, area.getLat());
            pstmt.setDouble(13, area.getLng());

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

    public int AdvanceMissionStatus(int missionID){
        try {
            DBConnector db = new DBConnector();
            Connection cn = db.getConnection();

            PreparedStatement pstmt = cn.prepareStatement("CALL `shield`.`advance_mission_status`(?);");
            pstmt.setInt(1, missionID);
            ResultSet rs = pstmt.executeQuery();
            rs.next();
            if (rs.getRow() == 0) {
                cn.close();
                return -1;
            } else {
                int status = rs.getInt(1);
                cn.close();
                return status;
            }
        } catch (SQLException ex) {
            Logger.getLogger(MissionDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return -1;
    }
    public boolean UpdateMission(int editorID, Mission mson) {
        try {
            DBConnector db = new DBConnector();
            Connection cn = db.getConnection();

            Area area = mson.getArea();

            PreparedStatement pstmt = cn.prepareStatement("CALL `shield`.`update_mission`(?, ?, ?, ?, ?, ?, ?, ?, ?);");
            pstmt.setInt(1, mson.getUserID());
            pstmt.setInt(2, mson.getId());
            pstmt.setString(3, mson.getTitle());
            pstmt.setString(4, mson.getObjective());
            pstmt.setString(5, mson.getSituation());
            pstmt.setString(6, mson.getCommanderIntent());
            pstmt.setString(7, mson.getConceptOfOperation());
            pstmt.setString(8, mson.getThemeStress());
            pstmt.setString(9, mson.getThemeAvoid());

            ResultSet rs = pstmt.executeQuery();
            rs.next();

            if (rs.getRow() == 0) {
                cn.close();
                return false;
            } else {
                //Tasks\

                pstmt = cn.prepareStatement("CALL `shield`.`delete_all_task_mission`(?);");
                pstmt.setInt(1, mson.getId());
                pstmt.execute();
                
                ArrayList<Task> taskList = mson.getTaskList();
                if(!su.ListIsNullOrEmpty(taskList)){
                     pstmt = cn.prepareStatement("CALL `shield`.`add_task`(?, ?, ?, ?);");
                     pstmt.setInt(1, editorID);
                     pstmt.setInt(2, mson.getId());
                     for(Task t : taskList){
                         pstmt.setString(3, t.getPsyopsElement());
                         pstmt.setString(4, t.getDesc());
                         pstmt.executeUpdate();
                     }
                }
                    
                cn.close();
                return true;
            }
        } catch (SQLException ex) {
            Logger.getLogger(MissionDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return false;
    }
}
