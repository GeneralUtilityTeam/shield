/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlet.analyst;

import dao.MissionDAO;
import entity.Mission;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.json.JSONArray;
import servlet.father.FatherServlet;

/**
 *
 * @author Dan Torres
 */
public class ANMission4TCOA extends FatherServlet {

     protected void servletAction(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        HttpSession session = request.getSession();
        String missionIDString;

        if (session.getAttribute("missionID") == null) {
            request.setAttribute("destination", "ANHome");
            ServletContext servcont = getServletContext();
            RequestDispatcher dispatch = servcont.getRequestDispatcher("/message.jsp");
            dispatch.forward(request, response);
        }
        missionIDString = session.getAttribute("missionID").toString();
        
        MissionDAO msonDAO = new MissionDAO();
        int missionID = Integer.parseInt(missionIDString);                              
        Mission mson = msonDAO.GetMission(missionID);
 
        request.setAttribute("level8", mson.getArea().getLevel8());
        request.setAttribute("level7", mson.getArea().getLevel7());
        request.setAttribute("level6", mson.getArea().getLevel6());
        request.setAttribute("level5", mson.getArea().getLevel5());
        request.setAttribute("level4", mson.getArea().getLevel4());
        request.setAttribute("level3", mson.getArea().getLevel3());
        request.setAttribute("level2", mson.getArea().getLevel2());
        request.setAttribute("level1", mson.getArea().getLevel1());
        request.setAttribute("lat", mson.getArea().getLat());
        request.setAttribute("lng", mson.getArea().getLng());
        ServletContext context = getServletContext();
        RequestDispatcher dispatch = context.getRequestDispatcher("/analyst/an_mission4tcoa.jsp");
        dispatch.forward(request, response);

    }
    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>


}
