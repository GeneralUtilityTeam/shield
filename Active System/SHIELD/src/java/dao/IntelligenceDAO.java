/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import db.DBConnector;
import entity.Source;
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
public class IntelligenceDAO {
    public ArrayList<Source> GetAllSources() {
        try {
            System.out.println("Running 1");
            DBConnector db = new DBConnector();
            Connection cn = db.getConnection();
            
            PreparedStatement pstmt = cn.prepareStatement("CALL `shield`.`3685`();");
            ResultSet rs = pstmt.executeQuery();
            rs.next();
            if (rs.getRow() == 0) {
                cn.close();
                return null;
            } else {
                ArrayList<Source> srcList = new ArrayList<Source>();
                do {
                    Source src = new Source();
                    src.setId(rs.getInt(1));
                    src.setClassID(rs.getInt(2));
                    src.setClassDesc(rs.getString(3));
                    src.setTitle(rs.getString(4));
                    src.setDesc(rs.getString(5));
                    src.setPublished(rs.getDate(6));
                    src.setEncoded(rs.getDate(7));
                    
                    srcList.add(src);
                } while (rs.next());
                System.out.println("Running 2");
                cn.close();
                return srcList;
            }
            
        } catch (SQLException ex) {
            Logger.getLogger(IntelligenceDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        return null;
    }
    public int AddSource(int userID, Source src){
        try {
            DBConnector db = new DBConnector();
            Connection cn = db.getConnection();
            
            PreparedStatement pstmt = cn.prepareStatement("CALL `shield`.`5688`(?, ?, ?, ?, ?);");
            pstmt.setInt(1, userID);
            pstmt.setInt(2, src.getClassID());
            pstmt.setString(3, src.getTitle());
            pstmt.setString(4, src.getDesc());
            pstmt.setDate(5, src.getPublished());
            
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
